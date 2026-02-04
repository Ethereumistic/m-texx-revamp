import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import StructuredData from '@/components/seo/StructuredData'
import { ArrowLeft, MapPin, Recycle, Check, AlertTriangle, X, Globe, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cyrillicToSlug } from '@/lib/utils'

// Constants for Infographics
const collectItems = [
    { id: "clothes", name: "Дрехи", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/clothes.svg" },
    { id: "shoes", name: "Обувки", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/shoes.svg" },
    { id: "bags", name: "Чанти", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/bag.svg" },
    { id: "accessories", name: "Аксесоари", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/acc.svg" },
    { id: "toys", name: "Плюшени играчки", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/toy.svg" },
    { id: "home", name: "Домашен текстил", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/home.svg" },
]

const doNotCollectItems = [
    { id: "glass", name: "Стъкло", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/glass.svg" },
    { id: "books", name: "Хартия", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/book.svg" },
    { id: "tins", name: "Метал", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/tin.svg" },
    { id: "banned", name: "Битов Отпадък", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/ban.svg" },
]

interface Location {
    address: string
    coords: string
}

interface CityData {
    cityName: string
    locations: Location[]
}

async function getCityData(citySlug: string): Promise<CityData | null> {
    const sanityData = await client.fetch(`
    *[_type == "cityLocations"] {
      cityName,
      locations[] {
        address,
        coords
      }
    }
  `)

    const found = sanityData.find((c: any) =>
        cyrillicToSlug(c.cityName) === citySlug
    )

    return found || null
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ city: string }>
}): Promise<Metadata> {
    const { city: citySlug } = await params
    const cityData = await getCityData(citySlug)

    if (!cityData) return { title: 'City Not Found' }

    const count = cityData.locations.length
    const city = cityData.cityName
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://m-texx.com'

    return {
        title: `${count}+ Текстилни Контейнери в ${city} | М-Текс Текстилно Рециклиране`,
        description: `Намерете най-близкия текстилен контейнер в ${city}. ${count} локации за безплатно рециклиране на дрехи и текстил. Карта и адреси на всички контейнери М-Текс в ${city}.`,
        keywords: [
            `текстилни контейнери ${city.toLowerCase()}`,
            `рециклиране дрехи ${city.toLowerCase()}`,
            `къде да изхвърля дрехи ${city.toLowerCase()}`,
            `м-текс ${city.toLowerCase()}`,
            `контейнери за дрехи ${city.toLowerCase()}`
        ],
        openGraph: {
            title: `${count} Текстилни Контейнери в ${city} | М-Текс`,
            description: `Интерактивна карта с всички ${count} контейнера за текстил в ${city}`,
            images: [{
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: `Карта на текстилни контейнери М-Текс в ${city}`
            }]
        },
        alternates: {
            canonical: `${baseUrl}/locations/${citySlug}`
        }
    }
}

export default async function CityPage({
    params
}: {
    params: Promise<{ city: string }>
}) {
    const { city: citySlug } = await params
    const cityData = await getCityData(citySlug)

    if (!cityData) {
        notFound()
    }

    const { cityName, locations } = cityData
    const markers = locations.map(loc => {
        const [lat, lng] = loc.coords.split(',').map(s => parseFloat(s.trim()))
        return { lat, lng, address: loc.address }
    })

    return (
        <div className="min-h-screen bg-background">
            <StructuredData
                type="localBusiness"
                data={{
                    city: cityName,
                    lat: markers[0]?.lat,
                    lng: markers[0]?.lng,
                    address: locations[0]?.address
                }}
            />
            <StructuredData
                type="breadcrumb"
                data={{
                    items: [
                        { name: 'Начало', url: '/' },
                        { name: 'Локации', url: '/locations' },
                        { name: cityName, url: `/locations/${citySlug}` }
                    ]
                }}
            />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-4 md:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 uppercase tracking-wider">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{cityName}</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase leading-[1.1]">
                                Текстилни Контейнери <br />
                                <span className="text-primary italic">в {cityName}</span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                                Намерете най-близкия от {locations.length} контейнера за безплатно и отговорно рециклиране на дрехи в {cityName}. Ние превръщаме текстилния отпадък в нов ресурс.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 font-bold uppercase" asChild>
                                    <a href="#locations">Виж адресите</a>
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full px-8 backdrop-blur" asChild>
                                    <Link href="/locations" className="flex items-center gap-2">
                                        <ArrowLeft className="w-4 h-4" />
                                        Всички локации
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <div className="relative aspect-[4/3] w-full">
                                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full translate-y-12" />
                                <Image
                                    src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/locations/container-bg-plain.png"
                                    alt="Textile container"
                                    fill
                                    className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-4 border-y bg-card/50 backdrop-blur-sm sticky top-16 z-30 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-center divide-x">
                    <div className="flex-1">
                        <p className="text-xl md:text-2xl font-black text-primary">{locations.length}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Контейнера</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-xl md:text-2xl font-black text-primary">24/7</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Достъпност</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-xl md:text-2xl font-black text-primary">0 лв.</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Такса</p>
                    </div>
                </div>
            </section>

            {/* What we collect section */}
            <section className="py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 italic uppercase tracking-tight">Какво събираме в {cityName}</h2>
                        <div className="w-20 h-2 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            Вашият принос в {cityName} има значение. Разберете кои текстилни изделия са подходящи за нашите контейнери.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Accepted items block */}
                        <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200/50 dark:border-green-900/50 backdrop-blur h-full overflow-hidden">
                            <CardHeader className="text-center -mt-8 py-8 bg-green-100/50 dark:bg-green-900/40 border-b border-green-200/50 shadow-sm">
                                <Recycle className="h-14 w-14 text-green-500 mx-auto mb-4" />
                                <CardTitle className="text-2xl font-black uppercase tracking-tight">Приемаме за рециклиране</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center">
                                    {collectItems.map((item) => (
                                        <div key={item.id} className="flex flex-col items-center">
                                            <div className="relative w-20 h-20 mb-4 transition-transform hover:scale-110 duration-300">
                                                <Image src={item.icon} alt={item.name} fill className="object-contain dark:invert" />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest opacity-80">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10 p-5 bg-white/50 dark:bg-black/20 rounded-2xl border border-green-200/50 flex items-center gap-4">
                                    <div className="bg-green-500 text-white rounded-full p-1 shrink-0">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <p className="text-sm font-bold uppercase tracking-tight leading-tight">Всички текстилни изделия трябва <br className="hidden sm:block" /> да бъдат чисти и сухи.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Not accepted items block */}
                        <Card className="bg-red-50/50 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/50 backdrop-blur h-full overflow-hidden">
                            <CardHeader className="text-center -mt-8 py-8 bg-red-100/50 dark:bg-red-900/40 border-b border-red-200/50 shadow-sm">
                                <AlertTriangle className="h-14 w-14 text-red-500 mx-auto mb-4" />
                                <CardTitle className="text-2xl font-black uppercase tracking-tight">Не приемаме</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-2 gap-8 text-center">
                                    {doNotCollectItems.map((item) => (
                                        <div key={item.id} className="flex flex-col items-center grayscale">
                                            <div className="relative w-20 h-20 mb-4">
                                                <Image src={item.icon} alt={item.name} fill className="object-contain dark:invert" />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest opacity-80">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10 p-5 bg-white/50 dark:bg-black/20 rounded-2xl border border-red-200/50 flex items-center gap-4">
                                    <div className="bg-red-500 text-white rounded-full p-1 shrink-0">
                                        <X className="h-4 w-4" />
                                    </div>
                                    <p className="text-sm font-bold uppercase tracking-tight leading-tight">Моля, НЕ изхвърляйте битови отпадъци <br className="hidden sm:block" /> в нашите контейнери!</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Address Grid Section */}
            <section id="locations" className="py-8 px-4 md:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="text-left">
                            <h2 className="text-3xl md:text-4xl font-black mb-4 italic uppercase tracking-tight">Локации на контейнерите</h2>
                            <p className="text-muted-foreground max-w-xl">
                                Всички {locations.length} контейнера М-Текс в {cityName} са разположени на ключови и удобни места.
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full px-6 whitespace-nowrap font-bold uppercase text-xs tracking-widest" asChild>
                            <Link href="/locations">Отвори картата</Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {locations.map((location, index) => (
                            <Card key={index} className="h-full border bg-card/60 backdrop-blur hover:bg-card/100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                                            <MapPin className="h-6 w-6 dark:group-hover:text-black" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-0.5">Локация {index + 1}</p>
                                            <h3 className="font-bold text-lg leading-tight uppercase tracking-tight">{location.address}</h3>
                                            <p className="text-sm text-muted-foreground pt-1 italic font-medium">{cityName}, България</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced CTA */}
            <section className="py-24 px-4 md:px-6 lg:px-8 overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <Card className="p-8 md:p-12 border bg-primary text-primary-foreground overflow-hidden relative shadow-2xl shadow-primary/40 rounded-[2.5rem]">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full translate-x-1/3 -translate-y-1/3" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-white font-black text-[10px] tracking-[0.2em] uppercase">
                                    Партньорство в {cityName}
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black leading-[1] uppercase tracking-tighter">
                                    Имате голямо <br className="hidden sm:block" /> количество <br /> текстил <br />
                                    <span className="text-green-500 italic">в {cityName}?</span>
                                </h2>
                                <p className="text-lg opacity-90 max-w-xl leading-relaxed font-medium">
                                    Предлагаме безплатни решения за фирми, хотели и частни лица при големи обеми над 50 кг. Свържете се с нашия екип за индивидуално събиране директно от вашия адрес.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button size="lg" variant="secondary" className="rounded-full px-10 text-primary font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform" asChild>
                                        <Link href="/contacts">Поискай събиране</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="rounded-full px-10 border-white/40 bg-white/5 hover:bg-white/20 text-white font-bold uppercase text-xs" asChild>
                                        <Link href="/recycling">Научете повече</Link>
                                    </Button>
                                </div>
                            </div>

                            <div className="lg:col-span-5 relative">
                                <div className="relative aspect-square max-w-sm mx-auto">
                                    <div className="absolute inset-0 bg-white/10 blur-[80px] rounded-full scale-75" />
                                    <Image
                                        src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/locations/container-bg-plain.png"
                                        alt="Textile container"
                                        fill
                                        className="object-contain relative z-10 drop-shadow-[0_25px_60px_rgba(0,0,0,0.5)] translate-y-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Footer Info */}
            <footer className="py-12 bg-muted/20 border-t">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Phone className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground pb-1">Телефон</p>
                            <p className="font-black text-xl leading-none">+359 876 600 139</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground pb-1">Имейл</p>
                            <p className="font-black text-xl leading-none uppercase">office@m-texx.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Globe className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground pb-1">Локация</p>
                            <p className="font-black text-xl leading-none uppercase tracking-tight">{cityName}, BG</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export async function generateStaticParams() {
    const cities: any[] = await client.fetch(`*[_type == "cityLocations"]{ cityName }`)

    return cities.map((city) => ({
        city: cyrillicToSlug(city.cityName)
    }))
}

