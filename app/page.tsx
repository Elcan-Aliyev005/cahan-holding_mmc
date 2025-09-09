"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Activity,
  Award,
  Phone,
} from "lucide-react"

const trustedCompanies = [
  "Azərbaycan Tibb Universiteti",
  "Respublika Klinik Xəstəxanası",
  "Mərkəzi Klinika",
  "Bakı Şəhər Klinikası",
]

const features = [
  {
    icon: Heart,
    title: "Peşəkar Həkimlər",
    titleEn: "Professional Doctors",
    description: "Təcrübəli və sertifikatlı həkimlərimiz sizin sağlamlığınız üçün ən yaxşı xidməti təqdim edir.",
    descriptionEn: "Our experienced and certified doctors provide the best service for your health.",
  },
  {
    icon: Shield,
    title: "Təhlükəsiz Müalicə",
    titleEn: "Safe Treatment",
    description: "Bütün müalicə prosesləri beynəlxalq standartlara uyğun olaraq həyata keçirilir.",
    descriptionEn: "All treatment processes are carried out in accordance with international standards.",
  },
  {
    icon: Clock,
    title: "24/7 Xidmət",
    titleEn: "24/7 Service",
    description: "Həftənin 7 günü, günün 24 saatı sizin xidmətinizdəyik.",
    descriptionEn: "We are at your service 24 hours a day, 7 days a week.",
  },
  {
    icon: Activity,
    title: "Müasir Avadanlıq",
    titleEn: "Modern Equipment",
    description: "Ən son texnologiyalar və müasir tibbi avadanlıqlarla təchiz olunmuş klinikamız.",
    descriptionEn: "Our clinic is equipped with the latest technologies and modern medical equipment.",
  },
]

const services = [
  {
    title: "Kardioloji Xidmətləri",
    titleEn: "Cardiology Services",
    description: "Ürək və damar xəstəliklərinin diaqnostikası və müalicəsi",
    descriptionEn: "Diagnosis and treatment of heart and vascular diseases",
    image: "/cardiology-equipment.png",
    price: "99 AZN-dən",
    priceEn: "From 99 AZN",
  },
  {
    title: "Laborator Testləri",
    titleEn: "Laboratory Tests",
    description: "Tam qan analizi və biokimyəvi müayinələr",
    descriptionEn: "Complete blood analysis and biochemical examinations",
    image: "/medical-laboratory-testing.jpg",
    price: "25 AZN-dən",
    priceEn: "From 25 AZN",
  },
  {
    title: "Radioloji Müayinə",
    titleEn: "Radiological Examination",
    description: "Rentgen, USM, KT və MRT müayinələri",
    descriptionEn: "X-ray, ultrasound, CT and MRI examinations",
    image: "/medical-radiology-equipment.jpg",
    price: "150 AZN-dən",
    priceEn: "From 150 AZN",
  },
]

const testimonials = [
  {
    name: "Əli Məmmədov",
    role: "Müştəri",
    roleEn: "Customer",
    content: "AzMedical-da aldığım xidmət həqiqətən peşəkar idi. Həkimlər çox diqqətli və səbirli idi.",
    contentEn:
      "The service I received at AzMedical was truly professional. The doctors were very attentive and patient.",
    rating: 5,
  },
  {
    name: "Leyla Həsənova",
    role: "Müştəri",
    roleEn: "Customer",
    content: "Müasir avadanlıqlar və rahat mühit. Tövsiyə edirəm!",
    contentEn: "Modern equipment and comfortable environment. I recommend it!",
    rating: 5,
  },
  {
    name: "Rəşad Quliyev",
    role: "Müştəri",
    roleEn: "Customer",
    content: "24/7 xidmət həqiqətən mövcuddur. Gecə vaxtı təcili halda kömək aldım.",
    contentEn: "24/7 service is really available. I got help in an emergency at night.",
    rating: 5,
  },
]

const faqData = [
  {
    question: "Randevu necə ala bilərəm?",
    questionEn: "How can I make an appointment?",
    answer: "Randevu almaq üçün telefon nömrəmizə zəng edə və ya onlayn forma vasitəsilə müraciət edə bilərsiniz.",
    answerEn: "You can call our phone number or apply through the online form to make an appointment.",
  },
  {
    question: "Sığorta qəbul edilirmi?",
    questionEn: "Is insurance accepted?",
    answer: "Bəli, biz əksər sığorta şirkətləri ilə əməkdaşlıq edirik. Ətraflı məlumat üçün bizimlə əlaqə saxlayın.",
    answerEn: "Yes, we cooperate with most insurance companies. Contact us for detailed information.",
  },
  {
    question: "Təcili hallarda nə etməliyəm?",
    questionEn: "What should I do in emergencies?",
    answer: "Təcili hallarda 24/7 xidmət nömrəmizə zəng edin və ya birbaşa klinikaımıza gəlin.",
    answerEn: "In emergencies, call our 24/7 service number or come directly to our clinic.",
  },
  {
    question: "Nəticələri necə ala bilərəm?",
    questionEn: "How can I get my results?",
    answer: "Test nəticələrinizi onlayn portalımızdan və ya klinikamızdan ala bilərsiniz.",
    answerEn: "You can get your test results from our online portal or from our clinic.",
  },
]

export default function HomePage() {
  const { toast } = useToast()
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: language === "az" ? "Uğurla abunə oldunuz!" : "Successfully subscribed!",
      description: language === "az" ? "Xəbər bülletenimizə abunə oldunuz." : "You have subscribed to our newsletter.",
    })
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionFadeIn className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  {language === "az" ? "Azərbaycanda #1 Tibbi Xidmət" : "#1 Medical Service in Azerbaijan"}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-balance">
                  {language === "az" ? "Sağlamlığınız bizim" : "Your health is our"}{" "}
                  <span className="text-primary">{language === "az" ? "prioritetimizdir" : "priority"}</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  {language === "az"
                    ? "Azərbaycanda ən yaxşı tibbi xidmətlər və məhsullar. Peşəkar həkimlər və müasir avadanlıqlarla."
                    : "The best medical services and products in Azerbaijan. With professional doctors and modern equipment."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg">
                  <Link href="/services">
                    <Stethoscope className="mr-2 h-5 w-5" />
                    {language === "az" ? "Xidmətlərimiz" : "Our Services"}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg bg-transparent">
                  <Link href="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    {language === "az" ? "Əlaqə saxla" : "Contact us"}
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{language === "az" ? "5000+ Müştəri" : "5000+ Customers"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>{language === "az" ? "15+ İl Təcrübə" : "15+ Years Experience"}</span>
                </div>
              </div>
            </MotionFadeIn>

            <MotionSlideUp delay={0.2} className="relative">
              <div className="relative">
                <img src="/modern-medical-clinic.png" alt="AzMedical Clinic" className="rounded-2xl shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
              </div>
            </MotionSlideUp>
          </div>
        </Container>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-b border-border">
        <Container>
          <MotionFadeIn className="text-center space-y-8">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === "az" ? "Bizə etibar edənlər" : "Trusted by"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {trustedCompanies.map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-sm font-medium text-muted-foreground">{company}</p>
                </motion.div>
              ))}
            </div>
          </MotionFadeIn>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <SectionHeader
            subtitle={language === "az" ? "Niyə bizi seçməlisiniz" : "Why choose us"}
            title={language === "az" ? "Sizin sağlamlığınız üçün ən yaxşısı" : "The best for your health"}
            description={
              language === "az"
                ? "Peşəkar komandamız və müasir avadanlıqlarımızla sizə ən yaxşı tibbi xidməti təqdim edirik."
                : "We provide you with the best medical service with our professional team and modern equipment."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {features.map((feature, index) => (
              <MotionSlideUp key={feature.title} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{language === "az" ? feature.title : feature.titleEn}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-pretty">
                      {language === "az" ? feature.description : feature.descriptionEn}
                    </CardDescription>
                  </CardContent>
                </Card>
              </MotionSlideUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Services Showcase */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeader
            subtitle={language === "az" ? "Xidmətlərimiz" : "Our services"}
            title={language === "az" ? "Geniş xidmət spektri" : "Wide range of services"}
            description={
              language === "az"
                ? "Müxtəlif tibbi sahələrdə peşəkar xidmətlər təqdim edirik."
                : "We provide professional services in various medical fields."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => (
              <MotionSlideUp key={service.title} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{language === "az" ? service.price : service.priceEn}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{language === "az" ? service.title : service.titleEn}</CardTitle>
                    <CardDescription>{language === "az" ? service.description : service.descriptionEn}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      {language === "az" ? "Ətraflı" : "Learn more"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </MotionSlideUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <Container>
          <SectionHeader
            subtitle={language === "az" ? "Qiymətlər" : "Pricing"}
            title={language === "az" ? "Hər büdcəyə uyğun paketlər" : "Packages for every budget"}
            description={
              language === "az"
                ? "Müxtəlif ehtiyaclara uyğun qiymət paketlərimiz mövcuddur."
                : "We have price packages suitable for different needs."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <MotionSlideUp delay={0.1}>
              <Card className="relative">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{language === "az" ? "Əsas" : "Basic"}</CardTitle>
                  <div className="text-3xl font-bold">
                    49 AZN<span className="text-sm font-normal text-muted-foreground">/ay</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Əsas müayinələr", "Laborator testləri", "Konsultasiya", "24/7 dəstək"].map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline">
                    {language === "az" ? "Seç" : "Choose"}
                  </Button>
                </CardContent>
              </Card>
            </MotionSlideUp>

            <MotionSlideUp delay={0.2}>
              <Card className="relative border-primary shadow-lg">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    {language === "az" ? "Populyar" : "Popular"}
                  </Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <div className="text-3xl font-bold">
                    99 AZN<span className="text-sm font-normal text-muted-foreground">/ay</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Bütün müayinələr", "Prioritet xidmət", "Evdə xidmət", "Sığorta dəstəyi"].map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">{language === "az" ? "Seç" : "Choose"}</Button>
                </CardContent>
              </Card>
            </MotionSlideUp>

            <MotionSlideUp delay={0.3}>
              <Card className="relative">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">VIP</CardTitle>
                  <div className="text-3xl font-bold">
                    199 AZN<span className="text-sm font-normal text-muted-foreground">/ay</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {["Fərdi həkim", "Limitsiz müayinə", "Xüsusi otaq", "Concierge xidməti"].map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline">
                    {language === "az" ? "Seç" : "Choose"}
                  </Button>
                </CardContent>
              </Card>
            </MotionSlideUp>
          </div>

          <MotionFadeIn delay={0.4} className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">
                {language === "az" ? "Bütün paketlərə bax" : "View all packages"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </MotionFadeIn>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeader
            subtitle={language === "az" ? "Müştəri rəyləri" : "Customer reviews"}
            title={language === "az" ? "Müştərilərimiz bizim haqqımızda" : "What our customers say about us"}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <MotionSlideUp key={testimonial.name} delay={index * 0.1}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <CardDescription className="text-pretty">
                      "{language === "az" ? testimonial.content : testimonial.contentEn}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "az" ? testimonial.role : testimonial.roleEn}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionSlideUp>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <Container size="md">
          <SectionHeader
            subtitle={language === "az" ? "Tez-tez verilən suallar" : "Frequently asked questions"}
            title={language === "az" ? "Suallarınızın cavabları" : "Answers to your questions"}
          />

          <MotionFadeIn delay={0.2} className="mt-16">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {language === "az" ? faq.question : faq.questionEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {language === "az" ? faq.answer : faq.answerEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </MotionFadeIn>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary/5">
        <Container size="md">
          <MotionFadeIn className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                {language === "az" ? "Xəbər bülletenimizə abunə olun" : "Subscribe to our newsletter"}
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                {language === "az"
                  ? "Sağlamlıq məsləhətləri və yeniliklər haqqında məlumat alın."
                  : "Get information about health tips and updates."}
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={language === "az" ? "E-mail ünvanınız" : "Your email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">{language === "az" ? "Abunə ol" : "Subscribe"}</Button>
            </form>
          </MotionFadeIn>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
