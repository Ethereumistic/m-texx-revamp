const allLogos = [
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/1-aprilci.png",
        title: "Априлци",
        width: "100",
        height: "100",
        region: "central",
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/2-ardino.png",
        title: "Ардино",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/3-banite.png",
        title: "Баните",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/4-bolqrovo.png",
        title: "Болярово",
        width: "100",
        height: "100",
        region: "east",
        invert: true
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/5-borino.png",
        title: "Борино",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/6-bqla.png",
        title: "Бяла",
        width: "100",
        height: "100",
        region: "east"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/7-v-preslav.png",
        title: "Велики Преслав",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/8-v-tarnovo.png",
        title: "Велико Търново",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/9-vetovo.png",
        title: "Ветово",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/10-vraca.png",
        title: "Враца",
        width: "100",
        height: "100",
        region: "west"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/11-gorna-orqhovica.png",
        title: "Горна Оряховица",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/12-dve-mogili.png",
        title: "Две Могили",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/13-dimitrovgrad.png",
        title: "Димитровград",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/14-drqnovo.png",
        title: "Дряново",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/15-etropole.png",
        title: "Етрополе",
        width: "100",
        height: "100",
        region: "west"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/16-zlatograd.png",
        title: "Златоград",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/17-zlatica.png",
        title: "Златица",
        width: "100",
        height: "100",
        region: "west"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/18-kazanluk.png",
        title: "Казанлък",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/19-kalofer.png",
        title: "Калофер",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/20-kaloqnovo.png",
        title: "Калояново",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/21-karlovo.png",
        title: "Карлово",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/22-karnobat.png",
        title: "Карнобат",
        width: "100",
        height: "100",
        region: "east",
        invert: true

    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/23-kneja.png",
        title: "Кнежа",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/24-krumovgrad.png",
        title: "Крумовград",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/25-lovech.png",
        title: "Ловеч",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/26-lubimec.png",
        title: "Любимец",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/27-momchilovgrad.png",
        title: "Момчиловград",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/28-madan.png",
        title: "Мадан",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/29-nova-zagora.png",
        title: "Нова Загора",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/30-nesebar.png",
        title: "Несебър",
        width: "100",
        height: "100",
        region: "east",
        invert: true

    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/31-pavlikeni.png",
        title: "Павликени",
        width: "100",
        height: "100",
        region: "north",
        invert: true

    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/32-panagiurishte.png",
        title: "Панагюрище",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/33-pavel-banq.png",
        title: "Павел Баня",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/34-pirdop.png",
        title: "Пирдоп",
        width: "100",
        height: "100",
        region: "west"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/35-pleven.png",
        title: "Плевен",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/36-plovdiv.png",
        title: "Пловдив",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/37-popovo.png",
        title: "Попово",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/38-pravec.png",
        title: "Правец",
        width: "100",
        height: "100",
        region: "west"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/39-polski.png",
        title: "Полски Тръмбеш",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/40-radnevo.png",
        title: "Раднево",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/41-razgrad.png",
        title: "Разград",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/42-ruse.png",
        title: "Русе",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/43-svishtov.png",
        title: "Свищов",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/44-sevlievo.png",
        title: "Севлиево",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/45-sliven.png",
        title: "Сливен",
        width: "100",
        height: "100",
        region: "east"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/46-smolqn.png",
        title: "Смолян",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/47-smqdovo.png",
        title: "Смядово",
        width: "100",
        height: "100",
        region: "east"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/48-sopot.png",
        title: "Сопот",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/49-sofia.png",
        title: "София",
        width: "100",
        height: "100",
        region: "west"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/50-strelcha.png",
        title: "Стрелча",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/51-troqn.png",
        title: "Троян",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/52-trqvna.png",
        title: "Трявна",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/53-turgovishte.png",
        title: "Търговище",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/54-ugurchin2.png",
        title: "Угърчин",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/55-haskovo.png",
        title: "Хасково",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/56-hisarq.png",
        title: "Хисаря",
        width: "100",
        height: "100",
        region: "central"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/57-cenovo.png",
        title: "Ценово",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/58-chepelare.png",
        title: "Чепеларе",
        width: "100",
        height: "100",
        region: "south"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/59-shumen.png",
        title: "Шумен",
        width: "100",
        height: "100",
        region: "north"
    },
    {
        src: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/partners/60-qmbol.png",
        title: "Ямбол",
        width: "100",
        height: "100",
        region: "east"
    },
];

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

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

async function seed() {
    console.log(`Starting seeding of ${allLogos.length} partners...`)

    const partnerList = allLogos.map((logo, index) => ({
        _key: `partner-${index}-${Math.random().toString(36).substring(2, 9)}`,
        title: logo.title,
        region: logo.region,
        logoUrl: logo.src,
        invert: logo.invert || false,
    }))

    const doc = {
        _type: 'partners',
        _id: 'partners-singleton',
        partnerList: partnerList,
    }

    try {
        console.log('Uploading partners document...')
        await client.createOrReplace(doc)
        console.log('Seeding finished successfully!')
    } catch (err) {
        console.error('Failed to seed partners:', err.message)
    }
}

seed()
