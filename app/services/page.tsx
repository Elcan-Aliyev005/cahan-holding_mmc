"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { useToast } from "@/hooks/use-toast"
import { Heart, TestTube, Scan, Stethoscope, Calendar, Phone, Mail, CheckCircle } from "lucide-react"

interface Service {
  id: number
  name: string
  desc: string
  icon: string
  features: string[]
}

const iconMap = {
  Heart,
  TestTube,
  Scan,
  Stethoscope,
}

export default function ServicesPage() {
  const { toast } = useToast()
  const [services, setServices] = React.useState<Service[]>([])
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [selectedService, setSelectedService] = React.useState<Service | null>(null)
  const [bookingForm, setBookingForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  })

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)

    // Load services from JSON
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data)
      })
      .catch((error) => {
        console.error("Error loading services:", error)
      })
  }, [])

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.service) {
      toast({
        title: language === "az" ? "Xəta" : "Error",
        description: language === "az" ? "Zəhmət olmasa bütün sahələri doldurun" : "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Mock booking submission
    toast({
      title: language === "az" ? "Randevu təsdiqləndi!" : "Appointment confirmed!",
      description:
        language === "az"
          ? "Randevunuz uğurla qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq."
          : "Your appointment has been successfully recorded. We will contact you soon.",
    })

    // Reset form
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      message: "",
    })
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Heart
    return IconComponent
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20">
        <Container>
          <SectionHeader
            title={language === "az" ? "Tibbi Xidmətlərimiz" : "Our Medical Services"}
            description={
              language === "az"
                ? "Peşəkar həkimlərimiz və müasir avadanlıqlarımızla sizə ən yaxşı tibbi xidməti təqdim edirik"
                : "We provide you with the best medical service with our professional doctors and modern equipment"
            }
          />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon)
              return (
                <MotionSlideUp key={service.id} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription className="text-pretty">{service.desc}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                          {language === "az" ? "Xidmətlər" : "Services"}
                        </h4>
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-sm text-muted-foreground">
                              +{service.features.length - 3} {language === "az" ? "daha çox" : "more"}
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => setSelectedService(service)}
                            >
                              {language === "az" ? "Ətraflı" : "Learn more"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                  <IconComponent className="h-6 w-6 text-primary" />
                                </div>
                                {service.name}
                              </DialogTitle>
                              <DialogDescription className="text-pretty">{service.desc}</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold mb-3">
                                  {language === "az" ? "Daxil olan xidmətlər:" : "Included services:"}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm">
                                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-muted/50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">{language === "az" ? "Qeyd:" : "Note:"}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {language === "az"
                                    ? "Bütün müayinələr təcrübəli həkimlərimiz tərəfindən həyata keçirilir və nəticələr 24 saat ərzində hazır olur."
                                    : "All examinations are performed by our experienced doctors and results are ready within 24 hours."}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="flex-1"
                              onClick={() => setBookingForm((prev) => ({ ...prev, service: service.name }))}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              {language === "az" ? "Randevu al" : "Book now"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>{language === "az" ? "Randevu Formu" : "Booking Form"}</DialogTitle>
                              <DialogDescription>
                                {language === "az"
                                  ? "Randevu almaq üçün məlumatlarınızı daxil edin"
                                  : "Enter your information to book an appointment"}
                              </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    {language === "az" ? "Ad Soyad" : "Full Name"} *
                                  </label>
                                  <Input
                                    value={bookingForm.name}
                                    onChange={(e) => setBookingForm((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder={language === "az" ? "Adınızı daxil edin" : "Enter your name"}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    {language === "az" ? "Telefon" : "Phone"} *
                                  </label>
                                  <Input
                                    value={bookingForm.phone}
                                    onChange={(e) => setBookingForm((prev) => ({ ...prev, phone: e.target.value }))}
                                    placeholder="+994 XX XXX XX XX"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">Email *</label>
                                <Input
                                  type="email"
                                  value={bookingForm.email}
                                  onChange={(e) => setBookingForm((prev) => ({ ...prev, email: e.target.value }))}
                                  placeholder="email@example.com"
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  {language === "az" ? "Xidmət" : "Service"} *
                                </label>
                                <Select
                                  value={bookingForm.service}
                                  onValueChange={(value) => setBookingForm((prev) => ({ ...prev, service: value }))}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={language === "az" ? "Xidmət seçin" : "Select service"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {services.map((service) => (
                                      <SelectItem key={service.id} value={service.name}>
                                        {service.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">{language === "az" ? "Tarix" : "Date"}</label>
                                  <Input
                                    type="date"
                                    value={bookingForm.date}
                                    onChange={(e) => setBookingForm((prev) => ({ ...prev, date: e.target.value }))}
                                    min={new Date().toISOString().split("T")[0]}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">{language === "az" ? "Vaxt" : "Time"}</label>
                                  <Select
                                    value={bookingForm.time}
                                    onValueChange={(value) => setBookingForm((prev) => ({ ...prev, time: value }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="09:00" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 9 }, (_, i) => {
                                        const hour = 9 + i
                                        return (
                                          <SelectItem key={hour} value={`${hour}:00`}>
                                            {hour}:00
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  {language === "az" ? "Əlavə qeyd" : "Additional notes"}
                                </label>
                                <Textarea
                                  value={bookingForm.message}
                                  onChange={(e) => setBookingForm((prev) => ({ ...prev, message: e.target.value }))}
                                  placeholder={
                                    language === "az"
                                      ? "Əlavə məlumat və ya xüsusi tələblər..."
                                      : "Additional information or special requirements..."
                                  }
                                  rows={3}
                                />
                              </div>

                              <Button type="submit" className="w-full">
                                <Calendar className="h-4 w-4 mr-2" />
                                {language === "az" ? "Randevu təsdiqlə" : "Confirm appointment"}
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </MotionSlideUp>
              )
            })}
          </div>

          {/* Contact Section */}
          <MotionFadeIn delay={0.4} className="mt-20 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{language === "az" ? "Təcili hal?" : "Emergency?"}</h3>
                  <p className="text-muted-foreground">
                    {language === "az" ? "24/7 təcili yardım xəttimizə zəng edin" : "Call our 24/7 emergency helpline"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" variant="outline" className="bg-transparent">
                      <Phone className="h-5 w-5 mr-2" />
                      +994 12 345 67 89
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent">
                      <Mail className="h-5 w-5 mr-2" />
                      emergency@azmedical.az
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionFadeIn>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
