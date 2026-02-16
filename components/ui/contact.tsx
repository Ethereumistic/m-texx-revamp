"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import useWeb3Forms from "@web3forms/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  AlertTriangle,
  Package,
  Handshake,
  Send,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  CheckCircle2
} from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { FieldErrors } from "react-hook-form"
import { SOCIAL_LINKS } from "@/lib/constants"

// Define form types
type BaseForm = {
  formType: string
}

type InquiryForm = BaseForm & {
  name: string
  email: string
  message: string
}

type ContainerForm = BaseForm & {
  name: string
  email: string
  phone?: string
  message: string
}

type PurchaseForm = BaseForm & {
  name: string
  email: string
  phone: string
  quantity: number
  message?: string
}

type PartnershipForm = BaseForm & {
  contactName: string
  organizationName: string
  organizationType: string
  phone: string
  email: string
  message: string
}

type FormValues = InquiryForm | ContainerForm | PurchaseForm | PartnershipForm

const WEB3FORMS_API_KEY = "01f6a210-afd3-47c2-990e-fda2938d5eac"

const getFormTypeName = (formType: string) => {
  switch (formType) {
    case "inquiry": return "запитване"
    case "container": return "проблем с контейнер"
    case "purchase": return "покупка на друзет"
    case "partnership": return "партньорство"
    default: return "съобщение"
  }
}

export function Contact() {
  const [activeTab, setActiveTab] = useState("inquiry")
  const [sliderValue, setSliderValue] = useState([50])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormValues>({
    defaultValues: {
      formType: "inquiry",
      quantity: 50,
    },
  })

  const { submit } = useWeb3Forms({
    access_key: WEB3FORMS_API_KEY,
    settings: {
      from_name: "M-Texx Textile Recycling",
      subject: `Ново ${getFormTypeName(activeTab)} от уебсайта`,
    },
    onSuccess: () => {
      toast.success("Успешно изпратено!", {
        description: "Благодарим ви за съобщението. Ще се свържем с вас скоро.",
      })
      reset()
      setSliderValue([50])
      setIsSubmitting(false)
    },
    onError: (error) => {
      console.error("Form submission error:", error)
      toast.error("Грешка", {
        description: "Възникна проблем при изпращането на формата. Моля, опитайте отново.",
      })
      setIsSubmitting(false)
    },
  })

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    reset({
      formType: value,
      quantity: value === "purchase" ? sliderValue[0] : undefined,
    } as any);
  };

  const formatSliderValue = (value: number) => {
    if (value >= 1000) return "1 тон"
    return `${value} кг`
  }

  const handleSliderChange = (value: number[]) => {
    if (value && value.length > 0) {
      setSliderValue([value[0]])
      setValue("quantity", value[0])
    }
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      const formData: Record<string, any> = { ...data, formType: activeTab, botcheck: "" };
      await submit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Грешка", {
        description: "Възникна проблем при изпращането на формата. Моля, опитайте отново.",
      });
      setIsSubmitting(false);
    }
  };

  const formErrors = errors as any;
  const getErrorMessage = (error: any) => error?.message || ""

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden min-h-screen">
      <Toaster />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Контакти</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Свържете се с нас</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ние сме тук, за да отговорим на вашите въпроси и да обсъдим възможностите за сътрудничество.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-6"
          >
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                title: "Телефон",
                value1: "+359 876 600 139",
                href1: "tel:+359876600139",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                title: "Имейл",
                value1: "office@m-texx.com",
                href1: "mailto:office@m-texx.com",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: "Адрес",
                value1: "Индустриална 44",
                value2: "Габрово 5302",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title: "Работно време",
                value1: "Пон - Пет: 08:30 - 17:30",
              },
            ].map((card, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all group">
                <CardContent className="px-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                    <div className="space-y-0.5">
                      {card.href1 ? (
                        <a href={card.href1} className="text-muted-foreground hover:text-primary transition-colors block text-sm">
                          {card.value1}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{card.value1}</p>
                      )}
                      {card.value2 && <p className="text-muted-foreground text-sm">{card.value2}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="">
              <h4 className="text-sm font-semibold mb-4 px-1">Последвайте ни</h4>
              <div className="flex gap-4 px-1">
                {[
                  { Icon: Facebook, href: SOCIAL_LINKS.facebook },
                  { Icon: Instagram, href: SOCIAL_LINKS.instagram },
                  { Icon: Linkedin, href: SOCIAL_LINKS.linkedin },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/30 hover:text-primary transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
                <CardTitle>Изпратете съобщение</CardTitle>
                <CardDescription>Изберете типа на вашето запитване и попълнете формата.</CardDescription>

                <Tabs defaultValue="inquiry" value={activeTab} onValueChange={handleTabChange} className="mt-6">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 border border-border/50 p-1.25 px-1">
                    <TabsTrigger value="inquiry" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="hidden sm:inline">Запитване</span>
                      <span className="sm:hidden text-[10px]">Инфо</span>
                    </TabsTrigger>
                    <TabsTrigger value="container" className="gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="hidden sm:inline">Проблем</span>
                      <span className="sm:hidden text-[10px]">Проблем</span>
                    </TabsTrigger>
                    <TabsTrigger value="purchase" className="gap-2">
                      <Package className="w-4 h-4" />
                      <span className="hidden sm:inline">Друзет</span>
                      <span className="sm:hidden text-[10px]">КДрузетупи</span>
                    </TabsTrigger>
                    <TabsTrigger value="partnership" className="gap-2">
                      <Handshake className="w-4 h-4" />
                      <span className="hidden sm:inline">Партньорство</span>
                      <span className="sm:hidden text-[10px]">Партньори</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="px-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <input type="hidden" {...register("formType")} value={activeTab} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            {activeTab === "partnership" ? "Лице за контакт" : "Име и фамилия"}
                          </Label>
                          <Input
                            {...register(activeTab === "partnership" ? "contactName" : "name" as any, { required: "Задължително поле" })}
                            placeholder="Въведете име"
                            className=" border-border/50 focus:border-primary/50 transition-all"
                          />
                          {formErrors[activeTab === "partnership" ? "contactName" : "name"] && (
                            <p className="text-xs text-destructive">{getErrorMessage(formErrors[activeTab === "partnership" ? "contactName" : "name"])}</p>
                          )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Имейл адрес</Label>
                          <Input
                            type="email"
                            {...register("email", {
                              required: "Задължително поле",
                              pattern: { value: /\S+@\S+\.\S+/, message: "Невалиден имейл" }
                            })}
                            placeholder="example@m-texx.com"
                            className=" border-border/50 focus:border-primary/50 transition-all"
                          />
                          {formErrors.email && <p className="text-xs text-destructive">{getErrorMessage(formErrors.email)}</p>}
                        </motion.div>

                        {(activeTab !== "inquiry") && (
                          <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium">Телефонен номер</Label>
                            <Input
                              {...register("phone" as any, { required: activeTab === "purchase" || activeTab === "partnership" ? "Задължително поле" : false })}
                              placeholder="+359 ..."
                              className=" border-border/50 focus:border-primary/50 transition-all"
                            />
                            {formErrors.phone && <p className="text-xs text-destructive">{getErrorMessage(formErrors.phone)}</p>}
                          </motion.div>
                        )}

                        {activeTab === "partnership" && (
                          <>
                            <motion.div variants={itemVariants} className="space-y-2">
                              <Label htmlFor="organization" className="text-sm font-medium">Организация</Label>
                              <Input
                                {...register("organizationName" as any, { required: "Задължително поле" })}
                                placeholder="Име на фирма/община"
                                className="focus:border-primary/50 transition-all"
                              />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                              <Label className="text-sm font-medium">Тип партньор</Label>
                              <Select onValueChange={(v) => setValue("organizationType" as any, v)}>
                                <SelectTrigger className="bg-background/50 border-border/50">
                                  <SelectValue placeholder="Изберете тип" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="municipality">Община</SelectItem>
                                  <SelectItem value="business">Бизнес партньор</SelectItem>
                                  <SelectItem value="logistics">Логистика</SelectItem>
                                  <SelectItem value="other">Друго</SelectItem>
                                </SelectContent>
                              </Select>
                            </motion.div>
                          </>
                        )}
                      </div>

                      {activeTab === "purchase" && (
                        <motion.div variants={itemVariants} className="space-y-4 py-2">
                          <div className="flex justify-between items-center">
                            <Label className="font-semibold">Количество Друзет</Label>
                            <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-md">{formatSliderValue(sliderValue[0])}</span>
                          </div>
                          <Slider
                            onValueChange={handleSliderChange}
                            value={sliderValue}
                            max={1000}
                            min={50}
                            step={50}
                          />
                          <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                            <span>50 кг</span>
                            <span>1+ тон</span>
                          </div>
                        </motion.div>
                      )}

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">
                          {activeTab === "container" ? "Описание на проблема" : "Вашето съобщение"}
                        </Label>
                        <Textarea
                          {...register("message" as any, { required: "Задължително поле", minLength: { value: 10, message: "Твърде кратко" } })}
                          placeholder={activeTab === "container" ? "Моля, посочете номер на контейнера или местоположение..." : "Опишете вашето запитване тук..."}
                          className=" border-border/50 focus:border-primary/50 transition-all min-h-[150px]"
                        />
                        {formErrors.message && <p className="text-xs text-destructive">{getErrorMessage(formErrors.message)}</p>}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Изпращане...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Изпрати
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}