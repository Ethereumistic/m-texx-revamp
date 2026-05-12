"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

export function EUProjectInfo() {
    return (
        <>
            <section className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">


                {/* Main Project Card */}
                <Card className="p-4 mb-6 border border-border bg-card">
                    {/* Header with EU Flag */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                        <div className="relative w-48 h-32 flex-shrink-0">
                            <Image
                                src="https://flagcdn.com/eu.svg"
                                alt="European Union Flag"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                                Съфинансирано от
                                <br /> Европейския Съюз
                            </h2>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {/* Project Title */}
                        <div>
                            <h3 className="text-lg font-bold text-primary mb-2">Наименование на проекта:</h3>
                            <p className="text-foreground text-base sm:text-lg font-semibold">
                                BG16RFPR001-2.004-1373 &bdquo;Енергийна ефективност и използване на енергия от възобновяеми източници в предприятията&ldquo;
                            </p>
                        </div>

                        {/* Program & Date Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border-l-4 border-primary pl-4">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Програма</p>
                                <p className="text-foreground font-semibold">&bdquo;Конкурентоспособност и иновации в предприятията&ldquo; 2021-2027</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Дата на стартиране</p>
                                <p className="text-foreground font-semibold">05.05.2026 г.</p>
                            </div>
                        </div>

                        {/* Project Description */}
                        <div>
                            <h3 className="text-lg font-bold text-primary mb-3">Кратко описание на проекта:</h3>
                            <p className="text-foreground leading-relaxed mb-4">
                                От 05.05.2026 г. &bdquo;М_ТЕКС РЕЦИКЛИРАНЕ НА ТЕКСТИЛ&ldquo; ООД стартира изпълнението на
                                договор за безвъзмездна финансова помощ BG16RFPR001-2.004-1373 по процедура &bdquo;Енергийна
                                ефективност и използване на енергия от възобновяеми източници в предприятията&ldquo;.
                            </p>
                            <p className="text-foreground leading-relaxed">
                                Проектът се финансира по Програма &bdquo;Конкурентоспособност и иновации в предприятията&ldquo; 2021-2027 и
                                срокът за неговото изпълнение е 12 месеца.
                            </p>
                        </div>

                        {/* Project Goals */}
                        <div>
                            <h3 className="text-lg font-bold text-primary mb-3">Цели по проекта:</h3>
                            <p className="text-foreground leading-relaxed">
                                Проектът цели да се повиши енергийната ефективност и енергийната независимост на
                                предприятието чрез внедряване на покривна фотоволтаична система за собствено потребление
                                и локални съоръжения за съхранение на енергия, водещи до устойчиво намаляване на разходите
                                за електроенергия и емисиите на парникови газове.
                            </p>
                        </div>

                        {/* Project Budget & Timeline */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                            <div className="border-l-4 border-accent pl-4">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Общ бюджет</p>
                                <p className="text-foreground font-bold text-lg">69 161.24 €</p>
                                <p className="text-xs text-muted-foreground mt-1">(65% безвъзмездна помощ)</p>
                            </div>
                            <div className="border-l-4 border-accent pl-4">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">ЕС съфинансиране</p>
                                <p className="text-foreground font-bold text-lg">38 211.59 €</p>
                            </div>
                            <div className="border-l-4 border-accent pl-4">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Начало</p>
                                <p className="text-foreground font-semibold">05.05.2026 г.</p>
                            </div>
                            <div className="border-l-4 border-accent pl-4">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Край</p>
                                <p className="text-foreground font-semibold">05.05.2027 г.</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* EU Disclaimer */}
                {/* <div className="bg-muted p-4 sm:p-6 border-l-4 border-primary text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Съфинансирано от Европейския Съюз.</span> Възгледите и
            мненията, изразени в този документ, обаче принадлежат на автора им и не отразяват задължително възгледите на
            Европейския съюз или органите на управление на него.
          </p>
        </div> */}

            </section>

        </>
    )
}