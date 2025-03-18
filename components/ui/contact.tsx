"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
import { MessageSquare, AlertTriangle, Package, Handshake, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { FieldErrors } from "react-hook-form"

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
  email: string  // Added missing email field for partnership form
  message: string
}

// Union type for all form types
type FormValues = InquiryForm | ContainerForm | PurchaseForm | PartnershipForm

// Type guard functions
const isInquiryForm = (form: FormValues): form is InquiryForm => form.formType === "inquiry"
const isContainerForm = (form: FormValues): form is ContainerForm => form.formType === "container"
const isPurchaseForm = (form: FormValues): form is PurchaseForm => form.formType === "purchase"
const isPartnershipForm = (form: FormValues): form is PartnershipForm => form.formType === "partnership"

// Get form type name for the email subject
const getFormTypeName = (formType: string) => {
  switch (formType) {
    case "inquiry":
      return "запитване"
    case "container":
      return "съобщение за проблем с контейнер"
    case "purchase":
      return "заявка за покупка на друзет"
    case "partnership":
      return "запитване за партньорство"
    default:
      return "съобщение"
  }
}

// Replace this with your actual API key
const WEB3FORMS_API_KEY = "0cef4aab-a071-4dc9-a3aa-62274afadcf8"

export function Contact() {
  const [activeTab, setActiveTab] = useState("inquiry")
  const [sliderValue, setSliderValue] = useState([50])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    trigger,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      formType: "inquiry",
      quantity: 50,
    },
  })

  // Initialize web3forms - API key directly in component for troubleshooting
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

  // Handle tab change
// Handle tab change
const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Reset form with appropriate defaults based on form type
    if (value === "inquiry") {
      reset({
        formType: value,
        name: "",
        email: "",
        message: ""
      });
    } else if (value === "container") {
      reset({
        formType: value,
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } else if (value === "purchase") {
      reset({
        formType: value,
        name: "",
        email: "",
        phone: "",
        quantity: sliderValue[0],
        message: ""
      });
    } else if (value === "partnership") {
      reset({
        formType: value,
        contactName: "",
        organizationName: "",
        organizationType: "",
        phone: "",
        email: "",
        message: ""
      });
    }
  };

  // Format the slider value to show kg
  const formatSliderValue = (value: number) => {
    if (value >= 1000) return "1 тон"
    return `${value} кг`
  }

  // Get the nearest keyframe value for the slider
  const getKeyframeValue = (value: number) => {
    const keyframes = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]
    return keyframes.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    })
  }

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    if (value && value.length > 0) {
      const keyframeValue = getKeyframeValue(value[0])
      setSliderValue([keyframeValue])
      setValue("quantity", keyframeValue)
    }
  }

  // Set the quantity when slider changes
  useEffect(() => {
    if (activeTab === "purchase") {
      setValue("quantity", sliderValue[0])
    }
  }, [sliderValue, activeTab, setValue])

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Starting form submission for:", activeTab);
      
      // Ensure formType is set correctly for all form types
      let formData: Record<string, any> = { ...data };
      formData.formType = activeTab;
      
      // Make sure form data is structured correctly
      if (activeTab === "inquiry") {
        console.log("Preparing inquiry form data:", {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          formType: activeTab,
        });
      } else if (activeTab === "container") {
        console.log("Preparing container form data:", {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          message: formData.message,
          formType: activeTab,
        });
      }
      
      // Add honeypot
      formData.botcheck = "";
      
      console.log("Final form data being submitted:", formData);
      
      // Submit the form with explicit await
      const result = await submit(formData);
      console.log("Form submission result:", result);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Грешка", {
        description: "Възникна проблем при изпращането на формата. Моля, опитайте отново.",
      });
      setIsSubmitting(false);
    }
  };

  // Get form errors based on active tab
  const getFormErrors = () => {
    switch (activeTab) {
      case "inquiry":
        return errors as FieldErrors<InquiryForm>
      case "container":
        return errors as FieldErrors<ContainerForm>
      case "purchase":
        return errors as FieldErrors<PurchaseForm>
      case "partnership":
        return errors as FieldErrors<PartnershipForm>
      default:
        return errors as FieldErrors<InquiryForm>
    }
  }

  const formErrors = getFormErrors()

  // Get typed errors for each form type
  const getInquiryErrors = () => formErrors as FieldErrors<InquiryForm>
  const getContainerErrors = () => formErrors as FieldErrors<ContainerForm>
  const getPurchaseErrors = () => formErrors as FieldErrors<PurchaseForm>
  const getPartnershipErrors = () => formErrors as FieldErrors<PartnershipForm>

  // Helper function to safely get error message
  const getErrorMessage = (error: any) => error?.message || ""

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      <Toaster />
      {/* Background Elements - matching the other components */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Свържете се с нас</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Контакт</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Изберете формата, която отговаря на вашите нужди, и ние ще се свържем с вас възможно най-скоро.
          </p>
        </motion.div>

        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Как можем да ви помогнем?</CardTitle>
            <CardDescription>Изберете типа на вашето запитване и попълнете формата по-долу.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="inquiry" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="inquiry" className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Запитване</span>
                </TabsTrigger>
                <TabsTrigger value="container" className="flex items-center justify-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Проблем с контейнер</span>
                </TabsTrigger>
                <TabsTrigger value="purchase" className="flex items-center justify-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Покупка Друзет</span>
                </TabsTrigger>
                <TabsTrigger value="partnership" className="flex items-center justify-center gap-2">
                  <Handshake className="h-4 w-4" />
                  <span>Партньорство</span>
                </TabsTrigger>
              </TabsList>

              {/* Hidden honeypot field for spam protection */}
              {/* <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} {...register("botcheck")} /> */}

              {/* Inquiry Form */}
              <TabsContent value="inquiry">
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                    {/* Add this to both the inquiry and container forms */}
<input type="hidden" {...register("formType")} value={activeTab} />
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="inquiry-name" className="block mb-2">
                      Име и фамилия <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="inquiry-name"
                      placeholder="Въведете вашето име"
                      {...register("name", { required: "Името е задължително" })}
                      className={getInquiryErrors().name ? "border-destructive" : ""}
                    />
                    {getInquiryErrors().name && <p className="text-destructive text-sm mt-1">{getErrorMessage(getInquiryErrors().name)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="inquiry-email" className="block mb-2">
                      Имейл адрес <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="inquiry-email"
                      type="email"
                      placeholder="example@email.com"
                      {...register("email", {
                        required: "Имейлът е задължителен",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Невалиден имейл адрес",
                        },
                      })}
                      className={getInquiryErrors().email ? "border-destructive" : ""}
                    />
                    {getInquiryErrors().email && <p className="text-destructive text-sm mt-1">{getErrorMessage(getInquiryErrors().email)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="inquiry-message" className="block mb-2">
                      Съобщение <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="inquiry-message"
                      placeholder="Въведете вашето съобщение тук..."
                      rows={5}
                      {...register("message", {
                        required: "Съобщението е задължително",
                        minLength: {
                          value: 10,
                          message: "Съобщението трябва да бъде поне 10 символа",
                        },
                      })}
                      className={getInquiryErrors().message ? "border-destructive" : ""}
                    />
                    {getInquiryErrors().message && <p className="text-destructive text-sm mt-1">{getErrorMessage(getInquiryErrors().message)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Изпращане...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Изпрати запитване
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>

              {/* Container Problem Form */}
              <TabsContent value="container">
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                    {/* Add this to both the inquiry and container forms */}
<input type="hidden" {...register("formType")} value={activeTab} />
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="container-name" className="block mb-2">
                      Име и фамилия <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="container-name"
                      placeholder="Въведете вашето име"
                      {...register("name", { required: "Името е задължително" })}
                      className={getContainerErrors().name ? "border-destructive" : ""}
                    />
                    {getContainerErrors().name && <p className="text-destructive text-sm mt-1">{getErrorMessage(getContainerErrors().name)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="container-email" className="block mb-2">
                      Имейл адрес <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="container-email"
                      type="email"
                      placeholder="example@email.com"
                      {...register("email", {
                        required: "Имейлът е задължителен",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Невалиден имейл адрес",
                        },
                      })}
                      className={getContainerErrors().email ? "border-destructive" : ""}
                    />
                    {getContainerErrors().email && <p className="text-destructive text-sm mt-1">{getErrorMessage(getContainerErrors().email)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="container-phone" className="block mb-2">
                      Телефон (незадължително)
                    </Label>
                    <Input id="container-phone" placeholder="+359 88 888 8888" {...register("phone")} />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="container-message" className="block mb-2">
                      Опишете проблема <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="container-message"
                      placeholder="Моля, опишете проблема с контейнера, включително местоположение и естество на проблема..."
                      rows={5}
                      {...register("message", {
                        required: "Съобщението е задължително",
                        minLength: {
                          value: 10,
                          message: "Съобщението трябва да бъде поне 10 символа",
                        },
                      })}
                      className={getContainerErrors().message ? "border-destructive" : ""}
                    />
                    {getContainerErrors().message && <p className="text-destructive text-sm mt-1">{getErrorMessage(getContainerErrors().message)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Изпращане...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Докладвай проблем
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>

              {/* Purchase Form */}
              <TabsContent value="purchase">
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="purchase-name" className="block mb-2">
                      Име/Компания <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="purchase-name"
                      placeholder="Въведете вашето име или името на компанията"
                      {...register("name", { required: "Името/Компанията е задължително" })}
                      className={getPurchaseErrors().name ? "border-destructive" : ""}
                    />
                    {getPurchaseErrors().name && <p className="text-destructive text-sm mt-1">{getErrorMessage(getPurchaseErrors().name)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="purchase-email" className="block mb-2">
                      Имейл адрес <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="purchase-email"
                      type="email"
                      placeholder="example@email.com"
                      {...register("email", {
                        required: "Имейлът е задължителен",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Невалиден имейл адрес",
                        },
                      })}
                      className={getPurchaseErrors().email ? "border-destructive" : ""}
                    />
                    {getPurchaseErrors().email && <p className="text-destructive text-sm mt-1">{getErrorMessage(getPurchaseErrors().email)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="purchase-phone" className="block mb-2">
                      Телефон <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="purchase-phone"
                      placeholder="+359 88 888 8888"
                      {...register("phone", { required: "Телефонният номер е задължителен" })}
                      className={getPurchaseErrors().phone ? "border-destructive" : ""}
                    />
                    {getPurchaseErrors().phone && <p className="text-destructive text-sm mt-1">{getErrorMessage(getPurchaseErrors().phone)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-4">
                    <input type="hidden" {...register("quantity")} />
                    <div className="flex justify-between items-center">
                      <Label>
                        Количество <span className="text-destructive">*</span>
                      </Label>
                      <span className="font-medium text-primary">{formatSliderValue(sliderValue[0])}</span>
                    </div>
                    <Slider
                      onValueChange={handleSliderChange}
                      value={sliderValue}
                      max={1000}
                      min={50}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>50 кг</span>
                      <span>1 тон</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="purchase-message" className="block mb-2">
                      Допълнителна информация (незадължително)
                    </Label>
                    <Textarea
                      id="purchase-message"
                      placeholder="Въведете допълнителна информация или специфични изисквания..."
                      rows={4}
                      {...register("message")}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Изпращане...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Заяви покупка
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>

              {/* Partnership Form */}
              <TabsContent value="partnership">
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <Label className="block mb-2">
                      Тип организация <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      onValueChange={(value: string) => {
                        setValue("organizationType", value);
                        trigger("organizationType");
                      }}
                    >
                      <SelectTrigger className={getPartnershipErrors().organizationType ? "border-destructive" : ""}>
                        <SelectValue placeholder="Изберете тип организация" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">Училище</SelectItem>
                        <SelectItem value="business">Бизнес</SelectItem>
                        <SelectItem value="municipality">Община</SelectItem>
                      </SelectContent>
                    </Select>
                    <input 
                      type="hidden" 
                      {...register("organizationType", { required: "Тип организация е задължително" })} 
                    />
                    {getPartnershipErrors().organizationType && (
                      <p className="text-destructive text-sm mt-1">{getErrorMessage(getPartnershipErrors().organizationType)}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="partnership-contact-name" className="block mb-2">
                      Име на контакт <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="partnership-contact-name"
                      placeholder="Въведете вашето име"
                      {...register("contactName", { required: "Името на контакта е задължително" })}
                      className={getPartnershipErrors().contactName ? "border-destructive" : ""}
                    />
                    {getPartnershipErrors().contactName && (
                      <p className="text-destructive text-sm mt-1">{getErrorMessage(getPartnershipErrors().contactName)}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="partnership-org-name" className="block mb-2">
                      Име на организацията <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="partnership-org-name"
                      placeholder="Въведете името на вашата организация"
                      {...register("organizationName", { required: "Името на организацията е задължително" })}
                      className={getPartnershipErrors().organizationName ? "border-destructive" : ""}
                    />
                    {getPartnershipErrors().organizationName && (
                      <p className="text-destructive text-sm mt-1">{getErrorMessage(getPartnershipErrors().organizationName)}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="partnership-email" className="block mb-2">
                      Имейл адрес <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="partnership-email"
                      type="email"
                      placeholder="example@email.com"
                      {...register("email", {
                        required: "Имейлът е задължителен",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Невалиден имейл адрес",
                        },
                      })}
                      className={getPartnershipErrors().email ? "border-destructive" : ""}
                    />
                    {getPartnershipErrors().email && <p className="text-destructive text-sm mt-1">{getErrorMessage(getPartnershipErrors().email)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="partnership-phone" className="block mb-2">
                      Телефон <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="partnership-phone"
                      placeholder="+359 88 888 8888"
                      {...register("phone", { required: "Телефонният номер е задължителен" })}
                      className={getPartnershipErrors().phone ? "border-destructive" : ""}
                    />
                    {getPartnershipErrors().phone && <p className="text-destructive text-sm mt-1">{getErrorMessage(getPartnershipErrors().phone)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="partnership-message" className="block mb-2">
                      Съобщение <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="partnership-message"
                      placeholder="Опишете как бихте искали да си партнирате с нас..."
                      rows={5}
                      {...register("message", {
                        required: "Съобщението е задължително",
                        minLength: {
                          value: 10,
                          message: "Съобщението трябва да бъде поне 10 символа",
                        },
                      })}
                      className={getPartnershipErrors().message ? "border-destructive" : ""}
                    />
                    {getPartnershipErrors().message && <p className="text-destructive text-sm mt-1">{getErrorMessage(getPartnershipErrors().message)}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Изпращане...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Изпрати запитване за партньорство
                        </>
                      )}
                    </Button>
                  </motion.div>
                  </motion.form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}