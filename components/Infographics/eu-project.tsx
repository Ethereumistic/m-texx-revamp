"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Maximize2, X } from "lucide-react"

const PROJECT_CODE = "BG16RFPR001-2.004-1373"
const PROJECT_TITLE =
    "Енергийна ефективност и използване на енергия от възобновяеми източници в предприятията"

// The 12 gold stars of the EU emblem, drawn on a 3:2 field per the official geometry:
// stars on a circle of radius 1/3 of the flag height, each star 1/18 of the height across.
const STAR_POINTS = (() => {
    const points: string[] = []
    for (let s = 0; s < 12; s++) {
        const a = (s * 30 - 90) * (Math.PI / 180)
        const cx = 405 + 180 * Math.cos(a)
        const cy = 270 + 180 * Math.sin(a)
        const star: string[] = []
        for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? 30 : 30 * 0.382
            const b = (i * 36 - 90) * (Math.PI / 180)
            star.push(`${(cx + r * Math.cos(b)).toFixed(1)},${(cy + r * Math.sin(b)).toFixed(1)}`)
        }
        points.push(star.join(" "))
    }
    return points
})()

function EUFlag({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 810 540" className={className} role="img" aria-label="Флаг на Европейския съюз">
            <rect width="810" height="540" fill="#003399" />
            {STAR_POINTS.map((p, i) => (
                <polygon key={i} points={p} fill="#FFCC00" />
            ))}
        </svg>
    )
}

/**
 * EU co-funding notice. Sits over the hero video on desktop and just under it on mobile,
 * and opens the full project details in a dialog.
 */
export function EUProjectBadge() {
    return (
        <Dialog.Root>
            <div className="relative z-[60] mx-4 -mt-10 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-500 ease-out motion-reduce:animate-none sm:mx-6 lg:absolute lg:bottom-10 lg:left-8 lg:mx-0 lg:mt-0">
                <Dialog.Trigger asChild>
                    <button
                        type="button"
                        aria-haspopup="dialog"
                        className="group relative flex w-full items-center gap-4 rounded-xl bg-white p-3 pr-12 text-left text-[#1a1f36] shadow-[0_18px_40px_-12px_rgba(0,20,80,0.45)] ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFCC00] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-4 sm:pr-14 lg:w-auto lg:max-w-lg"
                    >
                        <EUFlag className="h-11 w-auto shrink-0 rounded-[3px] sm:h-14" />
                        <span className="min-w-0">
                            <span className="block text-[0.95rem] font-bold leading-tight sm:text-base">
                                Съфинансирано от Европейския съюз
                            </span>
                            <span className="mt-1 block text-[0.8rem] leading-snug text-[#4a5272] sm:text-sm">
                                Проект за енергийна ефективност с покривна фотоволтаична система
                            </span>
                        </span>
                        <span
                            aria-hidden="true"
                            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md text-[#003399] transition-colors group-hover:bg-[#003399] group-hover:text-white sm:right-4 sm:top-4"
                        >
                            <Maximize2 className="h-4 w-4" />
                        </span>
                        <span className="sr-only">Отвори информацията за проекта</span>
                    </button>
                </Dialog.Trigger>
            </div>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[6000] bg-[#000a2e]/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-[6001] flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-background text-foreground shadow-2xl ring-1 ring-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 motion-reduce:animate-none">
                    <header className="relative flex items-center gap-5 bg-[#003399] px-5 py-5 pr-16 text-white sm:px-8 sm:py-7">
                        <span className="shrink-0 rounded-md bg-white p-1.5">
                            <EUFlag className="h-12 w-auto rounded-[2px] sm:h-16" />
                        </span>
                        <div className="min-w-0">
                            <Dialog.Title className="text-xl font-bold leading-tight sm:text-3xl">
                                Съфинансирано от Европейския съюз
                            </Dialog.Title>
                            <Dialog.Description className="mt-1 text-sm text-white/80 sm:text-base">
                                Договор {PROJECT_CODE}
                            </Dialog.Description>
                        </div>
                        <Dialog.Close
                            aria-label="Затвори"
                            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCC00] sm:right-4 sm:top-4"
                        >
                            <X className="h-6 w-6" />
                        </Dialog.Close>
                    </header>

                    <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
                        <h3 className="max-w-[60ch] text-lg font-semibold leading-snug sm:text-xl">
                            &bdquo;{PROJECT_TITLE}&ldquo;
                        </h3>

                        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-6 sm:grid-cols-4">
                            <div>
                                <dt className="text-sm text-muted-foreground">Общ бюджет</dt>
                                <dd className="mt-1 text-lg font-bold tabular-nums">69 161.24 €</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted-foreground">Съфинансиране от ЕС</dt>
                                <dd className="mt-1 text-lg font-bold tabular-nums">38 211.59 €</dd>
                                <dd className="text-xs text-muted-foreground">65% безвъзмездна помощ</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted-foreground">Начало</dt>
                                <dd className="mt-1 font-semibold tabular-nums">05.05.2026 г.</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted-foreground">Край</dt>
                                <dd className="mt-1 font-semibold tabular-nums">05.05.2027 г.</dd>
                            </div>
                            <div className="col-span-2 sm:col-span-4">
                                <dt className="text-sm text-muted-foreground">Програма</dt>
                                <dd className="mt-1 font-semibold">
                                    &bdquo;Конкурентоспособност и иновации в предприятията&ldquo; 2021-2027
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-6 max-w-[68ch] space-y-6 leading-relaxed">
                            <section>
                                <h4 className="mb-2 font-bold text-primary">Кратко описание на проекта</h4>
                                <p>
                                    От 05.05.2026 г. &bdquo;М_ТЕКС РЕЦИКЛИРАНЕ НА ТЕКСТИЛ&ldquo; ООД стартира изпълнението на
                                    договор за безвъзмездна финансова помощ {PROJECT_CODE} по процедура &bdquo;{PROJECT_TITLE}&ldquo;.
                                </p>
                                <p className="mt-3">
                                    Проектът се финансира по Програма &bdquo;Конкурентоспособност и иновации в
                                    предприятията&ldquo; 2021-2027 и срокът за неговото изпълнение е 12 месеца.
                                </p>
                            </section>
                            <section>
                                <h4 className="mb-2 font-bold text-primary">Цели по проекта</h4>
                                <p>
                                    Проектът цели да се повиши енергийната ефективност и енергийната независимост на
                                    предприятието чрез внедряване на покривна фотоволтаична система за собствено
                                    потребление и локални съоръжения за съхранение на енергия, водещи до устойчиво
                                    намаляване на разходите за електроенергия и емисиите на парникови газове.
                                </p>
                            </section>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
