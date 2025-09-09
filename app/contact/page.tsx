"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, PhoneCall } from "lucide-react"
import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { Header } from "@/components/common/Header"

export default function ContactPage() {
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: language === "az" ? "Mesaj göndərildi!" : "Message sent!",
      description: language === "az" ? "Tezliklə sizinlə əlaqə saxlayacağıq." : "We will contact you soon.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: language === "az" ? "Ünvan" : "Address",
      content: "Nizami küç. 203, Bakı AZ1010, Azərbaycan",
      contentEn: "203 Nizami Street, Baku AZ1010, Azerbaijan",
    },
    {
      icon: Phone,
      title: language === "az" ? "Telefon" : "Phone",
      content: "+994 12 555 0123",
      contentEn: "+994 12 555 0123",
    },
    {
      icon: Mail,
      title: language === "az" ? "E-poçt" : "Email",
      content: "info@azmedical.az",
      contentEn: "info@azmedical.az",
    },
    {
      icon: Clock,
      title: language === "az" ? "İş saatları" : "Working Hours",
      content: "B.e - Cümə: 08:00 - 20:00\nŞənbə: 09:00 - 17:00",
      contentEn: "Mon - Fri: 08:00 - 20:00\nSaturday: 09:00 - 17:00",
    },
  ]

  const emergencyContacts = [
    {
      title: language === "az" ? "Təcili Yardım" : "Emergency",
      number: "103",
      description: language === "az" ? "24/7 təcili tibbi yardım" : "24/7 emergency medical assistance",
    },
    {
      title: language === "az" ? "Qaynar Xətt" : "Hotline",
      number: "+994 12 555 0911",
      description: language === "az" ? "Tibbi məsləhət və qeydiyyat" : "Medical consultation and registration",
    },
    {
      title: language === "az" ? "Ambulans" : "Ambulance",
      number: "+994 12 555 0112",
      description: language === "az" ? "Evə çağırış xidməti" : "Home visit service",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
       <Header />
      <Container className="py-16">
        <MotionFadeIn>
          <SectionHeader
            title={language === "az" ? "Bizimlə Əlaqə" : "Contact Us"}
            subtitle={
              language === "az"
                ? "Suallarınız varsa və ya randevu almaq istəyirsinizsə, bizimlə əlaqə saxlayın"
                : "If you have questions or want to make an appointment, contact us"
            }
            centered
          />
        </MotionFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <MotionFadeIn delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>{language === "az" ? "Mesaj Göndərin" : "Send Message"}</CardTitle>
                <CardDescription>
                  {language === "az"
                    ? "Formu doldurun və biz tezliklə sizinlə əlaqə saxlayacağıq"
                    : "Fill out the form and we will contact you soon"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{language === "az" ? "Ad" : "First Name"}</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{language === "az" ? "Soyad" : "Last Name"}</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{language === "az" ? "E-poçt" : "Email"}</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{language === "az" ? "Telefon" : "Phone"}</Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{language === "az" ? "Mövzu" : "Subject"}</Label>
                    <Input id="subject" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{language === "az" ? "Mesaj" : "Message"}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      required
                      placeholder={language === "az" ? "Mesajınızı buraya yazın..." : "Write your message here..."}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? language === "az"
                        ? "Göndərilir..."
                        : "Sending..."
                      : language === "az"
                        ? "Mesaj Göndər"
                        : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionFadeIn>

          {/* Contact Information */}
          <div className="space-y-6">
            <MotionFadeIn delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>{language === "az" ? "Əlaqə Məlumatları" : "Contact Information"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{info.title}</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {language === "az" ? info.content : info.contentEn || info.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </MotionFadeIn>

            {/* Emergency Contacts */}
            <MotionFadeIn delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PhoneCall className="w-5 h-5 text-red-500" />
                    <span>{language === "az" ? "Təcili Əlaqə" : "Emergency Contacts"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={index === 0 ? "destructive" : "secondary"}>{contact.title}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{contact.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-lg">{contact.number}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </MotionFadeIn>
          </div>
        </div>
      </Container>
    </div>
  )
}
