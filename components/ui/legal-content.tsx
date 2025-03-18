"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Shield, FileText } from "lucide-react"

export function LegalContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("privacy")

  // Handle URL hash for direct navigation to specific tabs
  useEffect(() => {
    // Get the hash from the URL (remove the # symbol)
    const hash = window.location.hash.replace("#", "")

    // Set the active tab based on the hash
    if (hash === "cookies" || hash === "privacy" || hash === "terms") {
      setActiveTab(hash)
    }
  }, [searchParams])

  // Update URL hash when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.history.pushState(null, "", `#${value}`)
  }

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Правна информация</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Информация относно използването на нашия уебсайт, защита на данните и условия за ползване.
          </p>
        </motion.div>

        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Правна информация</CardTitle>
            <CardDescription>Моля, изберете раздел, за да видите съответната информация.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="privacy" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="cookies" className="flex items-center gap-2">
                  <Cookie className="h-4 w-4" />
                  <span>Бисквитки</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Поверителност</span>
                </TabsTrigger>
                <TabsTrigger value="terms" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Правила</span>
                </TabsTrigger>
              </TabsList>

              {/* Cookies Content */}
              <TabsContent value="cookies" className="space-y-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold">Политика за бисквитките</h2>

                  <h3 className="text-xl font-semibold mt-6">Какво представляват бисквитките?</h3>
                  <p>
                    Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство (компютър, таблет
                    или мобилен телефон) когато посещавате нашия уебсайт. Те ни позволяват да осигурим правилното
                    функциониране на сайта, да подобрим вашето потребителско изживяване и да анализираме как се използва
                    нашият уебсайт.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Какви бисквитки използваме?</h3>
                  <p>
                    Нашият уебсайт използва само необходими бисквитки, които са от съществено значение за правилното
                    функциониране на сайта. Тези бисквитки не събират лична информация и се използват само за
                    осигуряване на основната функционалност на уебсайта.
                  </p>

                  <h4 className="text-lg font-semibold mt-4">Необходими бисквитки</h4>
                  <p>
                    Тези бисквитки са необходими за функционирането на нашия уебсайт и не могат да бъдат изключени. Те
                    обикновено се задават само в отговор на действия, извършени от вас, като например настройка на
                    вашите предпочитания за поверителност, влизане в системата или попълване на формуляри.
                  </p>

                  <table className="w-full border-collapse mt-4">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Име</th>
                        <th className="text-left py-2">Цел</th>
                        <th className="text-left py-2">Срок</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">session</td>
                        <td className="py-2">Запазва състоянието на сесията на потребителя</td>
                        <td className="py-2">Сесия</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3 className="text-xl font-semibold mt-6">Как да управлявате бисквитките?</h3>
                  <p>
                    Повечето уеб браузъри позволяват контрол върху бисквитките чрез настройките на браузъра. За да
                    научите повече как да управлявате бисквитките, моля, посетете страниците за помощ на вашия браузър:
                  </p>
                  <ul>
                    <li>
                      Google Chrome:{" "}
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Управление на бисквитки
                      </a>
                    </li>
                    <li>
                      Mozilla Firefox:{" "}
                      <a
                        href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Управление на бисквитки
                      </a>
                    </li>
                    <li>
                      Safari:{" "}
                      <a
                        href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Управление на бисквитки
                      </a>
                    </li>
                    <li>
                      Microsoft Edge:{" "}
                      <a
                        href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Управление на бисквитки
                      </a>
                    </li>
                  </ul>

                  <p className="mt-6">
                    Моля, имайте предвид, че ограничаването на бисквитките може да повлияе на функционалността на нашия
                    уебсайт.
                  </p>
                </div>
              </TabsContent>

              {/* Privacy Policy Content */}
              <TabsContent value="privacy" className="space-y-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold">Политика за поверителност</h2>
                  <p className="lead">Последна актуализация: {new Date().toLocaleDateString("bg-BG")}</p>

                  <h3 className="text-xl font-semibold mt-6">Въведение</h3>
                  <p>
                    M-Texx Textile Recycling (&quot;ние&quot;, &quot;нас&quot; или &quot;нашият&quot;) се ангажира да защитава вашата поверителност.
                    Тази Политика за поверителност обяснява как събираме, използваме и защитаваме информацията, която
                    може да бъде събрана, когато посещавате нашия уебсайт.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Каква информация събираме?</h3>
                  <p>Нашият уебсайт е предимно информационен и събираме много ограничено количество данни:</p>
                  <ul>
                    <li>
                      <strong>Информация от контактната форма:</strong> Когато използвате нашата контактна форма,
                      събираме информацията, която предоставяте, като име, имейл адрес и съдържанието на вашето
                      съобщение, за да можем да отговорим на вашето запитване.
                    </li>
                    <li>
                      <strong>Данни за местоположение (по избор):</strong> На страницата с локации, ако изберете да
                      използвате функцията за намиране на най-близкия контейнер, браузърът ви ще поиска разрешение за
                      достъп до вашето текущо местоположение. Тази информация се използва само в момента на заявката, за
                      да изчисли най-близкия контейнер, и не се съхранява на нашите сървъри.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">Как използваме вашата информация?</h3>
                  <p>Използваме събраната информация само за следните цели:</p>
                  <ul>
                    <li>За да отговорим на вашите запитвания, изпратени чрез нашата контактна форма</li>
                    <li>
                      За да ви помогнем да намерите най-близкия контейнер за рециклиране на текстил (само когато изрично
                      разрешите достъп до вашето местоположение)
                    </li>
                    <li>За да подобрим нашия уебсайт и потребителското изживяване</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">Споделяне на информация</h3>
                  <p>
                    Ние не продаваме, не търгуваме и не прехвърляме по друг начин вашата лична информация на трети
                    страни. Това не включва доверени трети страни, които ни помагат в работата на нашия уебсайт или в
                    обслужването на вас, при условие че тези страни се съгласят да пазят тази информация в
                    поверителност.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Сигурност на данните</h3>
                  <p>
                    Ние прилагаме различни мерки за сигурност, за да поддържаме безопасността на вашата лична
                    информация, когато въвеждате, изпращате или осъществявате достъп до вашата лична информация. Всички
                    данни, изпратени чрез нашата контактна форма, се предават чрез защитена SSL връзка.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Вашите права</h3>
                  <p>Имате следните права по отношение на вашите лични данни:</p>
                  <ul>
                    <li>Право на достъп до вашите лични данни</li>
                    <li>Право на коригиране на неточни лични данни</li>
                    <li>Право на изтриване на вашите лични данни</li>
                    <li>Право на ограничаване на обработката на вашите лични данни</li>
                    <li>Право на възражение срещу обработката на вашите лични данни</li>
                    <li>Право на преносимост на данните</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">Промени в тази политика</h3>
                  <p>
                    Можем да актуализираме нашата Политика за поверителност от време на време. Ще ви уведомим за всички
                    промени, като публикуваме новата Политика за поверителност на тази страница. Препоръчваме ви да
                    преглеждате периодично тази Политика за поверителност за всякакви промени.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Свържете се с нас</h3>
                  <p>
                    Ако имате въпроси относно тази Политика за поверителност, моля, свържете се с нас чрез нашата
                    контактна форма или на имейл адрес: office@m-texx.com
                  </p>
                </div>
              </TabsContent>

              {/* Terms and Conditions Content */}
              <TabsContent value="terms" className="space-y-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold">Правила и условия</h2>
                  <p className="lead">Последна актуализация: {new Date().toLocaleDateString("bg-BG")}</p>

                  <h3 className="text-xl font-semibold mt-6">1. Въведение</h3>
                  <p>
                    Добре дошли на уебсайта на M-Texx Textile Recycling. Тези Правила и условия регулират вашето
                    използване на нашия уебсайт, достъпен на адрес www.m-texx.com. Чрез достъп или използване на
                    уебсайта, вие се съгласявате да бъдете обвързани с тези Правила и условия. Ако не сте съгласни с
                    някоя част от условията, тогава нямате разрешение да използвате уебсайта.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">2. Интелектуална собственост</h3>
                  <p>
                    Уебсайтът и цялото му съдържание, функции и функционалност (включително, но не само, цялата
                    информация, софтуер, текст, дисплеи, изображения, видео и аудио, както и дизайнът, селекцията и
                    подреждането на тях) са собственост на M-Texx Textile Recycling, неговите лицензодатели или други
                    доставчици на такъв материал и са защитени от международни закони за авторското право, търговски
                    марки, патенти, търговски тайни и други закони за интелектуална собственост или права на
                    собственост.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">3. Ограничения за използване</h3>
                  <p>
                    Можете да използвате уебсайта само за законни цели и в съответствие с тези Правила и условия. Вие се
                    съгласявате да не използвате уебсайта:
                  </p>
                  <ul>
                    <li>По начин, който нарушава приложимите национални или международни закони или разпоредби.</li>
                    <li>
                      За експлоатиране, нараняване или опит за експлоатиране или нараняване на непълнолетни по какъвто и
                      да е начин.
                    </li>
                    <li>
                      За предаване или осигуряване на изпращането на рекламни или промоционални материали без наше
                      предварително писмено съгласие.
                    </li>
                    <li>
                      За представяне на друго лице или субект или за фалшиво представяне на вашата връзка с лице или
                      субект.
                    </li>
                    <li>
                      За ангажиране с каквато и да е друга дейност, която ограничава или възпрепятства използването или
                      удоволствието от уебсайта от когото и да било.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">4. Точност на информацията</h3>
                  <p>
                    Полагаме всички усилия, за да гарантираме, че информацията, предоставена на нашия уебсайт, е точна и
                    актуална. Въпреки това, не можем да гарантираме, че цялата информация ще бъде без грешки или
                    пропуски. Ние си запазваме правото да правим промени в съдържанието на уебсайта по всяко време без
                    предизвестие.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">5. Връзки към други уебсайтове</h3>
                  <p>
                    Нашият уебсайт може да съдържа връзки към уебсайтове на трети страни, които не са притежавани или
                    контролирани от M-Texx Textile Recycling. Ние нямаме контрол и не поемаме отговорност за
                    съдържанието, политиките за поверителност или практиките на уебсайтове или услуги на трети страни.
                    Вие допълнително признавате и се съгласявате, че M-Texx Textile Recycling не носи отговорност, пряко
                    или косвено, за каквито и да било щети или загуби, причинени или предполагаеми, причинени от или във
                    връзка с използването или разчитането на такова съдържание, стоки или услуги, достъпни на или чрез
                    такива уебсайтове или услуги.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">6. Ограничение на отговорността</h3>
                  <p>
                    В никакъв случай M-Texx Textile Recycling, нито неговите директори, служители, партньори, агенти,
                    доставчици или филиали, няма да носят отговорност за каквито и да било косвени, случайни, специални,
                    последващи или наказателни щети, включително без ограничение, загуба на печалби, данни, използване,
                    репутация или други нематериални загуби, произтичащи от вашия достъп до или използване на или
                    невъзможност за достъп до или използване на уебсайта.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">7. Приложимо право</h3>
                  <p>
                    Тези Правила и условия се уреждат и тълкуват в съответствие със законите на Република България, без
                    оглед на нейните разпоредби за конфликт на закони.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">8. Промени в Правилата и условията</h3>
                  <p>
                    Ние си запазваме правото, по наше усмотрение, да променяме или заменяме тези Правила и условия по
                    всяко време. Ако ревизията е съществена, ще се опитаме да предоставим поне 30-дневно предизвестие
                    преди влизането в сила на новите условия. Това, което представлява съществена промяна, ще бъде
                    определено по наше усмотрение.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">9. Свържете се с нас</h3>
                  <p>
                    Ако имате въпроси относно тези Правила и условия, моля, свържете се с нас чрез нашата контактна
                    форма или на имейл адрес: office@m-texx.com
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

