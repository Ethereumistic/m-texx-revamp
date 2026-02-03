import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'cityLocations',
    title: 'City Locations',
    type: 'document',
    fields: [
        defineField({
            name: 'cityName',
            title: 'City Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'locations',
            title: 'Locations in this City',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'locationEntry',
                    fields: [
                        defineField({
                            name: 'address',
                            title: 'Address',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'coords',
                            title: 'Coordinates (Lat, Lng)',
                            type: 'string',
                            description: 'Format: 42.735078, 24.917709',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'address',
                            subtitle: 'coords',
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'cityName',
            locations: 'locations',
        },
        prepare({ title, locations }) {
            const count = locations ? locations.length : 0
            return {
                title: title,
                subtitle: `${count} location(s)`,
            }
        },
    },
})
