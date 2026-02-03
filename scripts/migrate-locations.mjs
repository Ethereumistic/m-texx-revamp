import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const {
    NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET,
    SANITY_WRITE_TOKEN
} = process.env

if (!SANITY_WRITE_TOKEN) {
    console.error('ERROR: SANITY_WRITE_TOKEN is missing in .env.local')
    process.exit(1)
}

const client = createClient({
    projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: SANITY_WRITE_TOKEN,
    apiVersion: '2024-03-03',
})

// Simple hash function for safe Sanity IDs
function getSafeId(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return 'city-' + Math.abs(hash).toString(36);
}

async function migrate() {
    const csvPath = path.join(process.cwd(), 'locations.csv')
    const content = fs.readFileSync(csvPath, 'utf-8')

    // Simple CSV parser that handles quoted fields
    const parseCSV = (text) => {
        const rows = []
        const lines = text.split('\n')
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue

            const row = []
            let currentField = ''
            let inQuotes = false

            for (let char of lines[i]) {
                if (char === '"') {
                    inQuotes = !inQuotes
                } else if (char === ',' && !inQuotes) {
                    row.push(currentField.trim())
                    currentField = ''
                } else {
                    currentField += char
                }
            }
            row.push(currentField.trim())
            rows.push(row)
        }
        return rows
    }

    const data = parseCSV(content)
    console.log(`Parsed ${data.length} rows from CSV.`)

    // Group by city - TRIMMING IS CRITICAL
    const cityGroups = {}
    data.forEach(([city, address, geocode]) => {
        if (!city || !address || !geocode) return

        const trimmedCity = city.trim()
        if (!cityGroups[trimmedCity]) {
            cityGroups[trimmedCity] = []
        }

        cityGroups[trimmedCity].push({
            _key: `loc-${Math.random().toString(36).substring(2, 9)}`,
            address: address.trim(),
            coords: geocode.replace(/["]/g, '').trim()
        })
    })

    const cities = Object.keys(cityGroups)
    console.log(`Grouped into ${cities.length} distinct cities.`)

    // Optional: Delete old cityLocations documents to start fresh
    /*
    console.log('Cleaning up old documents...')
    await client.delete({ query: '*[_type == "cityLocations"]' })
    */

    let totalUploaded = 0;
    for (const cityName of cities) {
        try {
            // Create a unique ID based on the cityName hash to avoid collisions
            const docId = getSafeId(cityName);

            const doc = {
                _type: 'cityLocations',
                _id: docId,
                cityName: cityName,
                locations: cityGroups[cityName]
            }

            process.stdout.write(`Uploading [${cityName}] (${cityGroups[cityName].length} locations)... `)
            await client.createOrReplace(doc)
            process.stdout.write('DONE\n')
            totalUploaded += cityGroups[cityName].length;
        } catch (err) {
            console.error(`\nFailed to upload ${cityName}:`, err.message)
        }
    }

    console.log(`\nMigration finished! Total locations uploaded: ${totalUploaded}`)
}

migrate()
