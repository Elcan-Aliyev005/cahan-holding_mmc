"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity,
} from "lucide-react"
import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { Header } from "@/components/common/Header"

export default function AboutPage() {
  const [language, setLanguage] = React.useState<"az" | "en">("az")

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
  }, [])

  const stats = [
    { icon: Users, label: "Xəstə", value: "50,000+", color: "text-blue-600" },
    { icon: Award, label: "İl Təcrübə", value: "25+", color: "text-green-600" },
    { icon: Stethoscope, label: "Həkim", value: "200+", color: "text-purple-600" },
    { icon: Clock, label: "24/7 Xidmət", value: "Həmişə", color: "text-orange-600" },
  ]

  const departments = [
    {
      icon: Heart,
      name: "Kardioloji",
      description: "Ürək və damar xəstəlikləri",
      doctors: 15,
      color: "text-red-500",
    },
    {
      icon: Brain,
      name: "Nevroloji",
      description: "Sinir sistemi xəstəlikləri",
      doctors: 12,
      color: "text-purple-500",
    },
    {
      icon: Eye,
      name: "Oftalmoloji",
      description: "Göz xəstəlikləri və cərrahiyyəsi",
      doctors: 8,
      color: "text-blue-500",
    },
    {
      icon: Bone,
      name: "Ortopediya",
      description: "Sümük və oynaq xəstəlikləri",
      doctors: 10,
      color: "text-green-500",
    },
    {
      icon: Baby,
      name: "Pediatriya",
      description: "Uşaq xəstəlikləri",
      doctors: 18,
      color: "text-pink-500",
    },
    {
      icon: Activity,
      name: "Təcili Yardım",
      description: "24/7 təcili tibbi yardım",
      doctors: 25,
      color: "text-orange-500",
    },
  ]

  const values = [
    {
      title: "Keyfiyyət",
      description: "Ən yüksək tibbi standartlara uyğun xidmət göstəririk",
    },
    {
      title: "Güvən",
      description: "Xəstələrimizin etimadını qazanmaq bizim əsas məqsədimizdir",
    },
    {
      title: "İnnovasiya",
      description: "Ən müasir tibbi texnologiyalardan istifadə edirik",
    },
    {
      title: "Şəfaqlıq",
      description: "Hər xəstəyə fərdi yanaşma və qayğı göstəririk",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <Container className="py-16">
        {/* Hero Section */}
        <MotionFadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">AzMedical Xəstəxanası</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              25 ildən artıq təcrübə ilə Azərbaycanda ən etibarlı və müasir tibbi xidmətlər təqdim edirik.
              Xəstələrimizin sağlamlığı bizim əsas prioritetimizdir.
            </p>
          </div>
        </MotionFadeIn>

        {/* Stats */}
        <MotionSlideUp delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-4 ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionSlideUp>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <MotionSlideUp delay={0.3}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Missiyamız</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Azərbaycanda tibbi xidmətlərin keyfiyyətini yüksəltmək, xəstələrimizə ən müasir texnologiyalar və
                  peşəkar həkim kadri ilə xidmət göstərmək. Hər xəstənin sağlamlığını qorumaq və bərpa etmək üçün fərdi
                  yanaşma tətbiq edirik.
                </p>
              </CardContent>
            </Card>
          </MotionSlideUp>

          <MotionSlideUp delay={0.4}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Vizyonumuz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Regionda aparıcı tibbi mərkəz olmaq, beynəlxalq standartlara uyğun xidmətlər təqdim etmək. Tibbi
                  təhsilin inkişafına töhfə vermək və gələcək nəsil həkimlərin yetişməsinə dəstək olmaq.
                </p>
              </CardContent>
            </Card>
          </MotionSlideUp>
        </div>

        {/* Departments */}
        <MotionFadeIn delay={0.5}>
          <SectionHeader
            title="Tibbi Şöbələrimiz"
            subtitle="Müxtəlif sahələrdə ixtisaslaşmış həkim komandamız"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {departments.map((dept, index) => (
              <MotionSlideUp key={index} delay={0.1 * index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-4 ${dept.color}`}
                    >
                      <dept.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{dept.name}</CardTitle>
                    <CardDescription>{dept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{dept.doctors} həkim</Badge>
                      <Button variant="ghost" size="sm">
                        Ətraflı
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </MotionSlideUp>
            ))}
          </div>
        </MotionFadeIn>

        {/* Values */}
        <MotionSlideUp delay={0.6}>
          <SectionHeader title="Dəyərlərimiz" subtitle="Bizim işimizi istiqamətləndirən əsas prinsiplər" centered />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </MotionSlideUp>

        {/* Contact Info */}
        <MotionFadeIn delay={0.7}>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Bizimlə Əlaqə</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Suallarınız varsa və ya randevu almaq istəyirsinizsə, bizimlə əlaqə saxlayın
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">Ünvan</h4>
                  <p className="text-sm text-muted-foreground">Nizami küç. 203, Bakı, Azərbaycan</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">Telefon</h4>
                  <p className="text-sm text-muted-foreground">
                    +994 12 555 0123
                    <br />
                    *1234 (Qaynar xətt)
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">E-mail</h4>
                  <p className="text-sm text-muted-foreground">
                    info@azmedical.az
                    <br />
                    randevu@azmedical.az
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionFadeIn>
      </Container>
    </div>
  )
}
