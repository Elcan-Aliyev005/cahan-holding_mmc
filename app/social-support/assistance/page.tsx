"use client"

import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HandHeart, Users, Heart, Phone } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/common/Header"

const assistanceServices = [
  {
    id: 1,
    name: "Pulsuz Müayinə",
    nameEn: "Free Examination",
    description: "Sosial yardıma ehtiyacı olan şəxslər üçün pulsuz müayinə",
    descriptionEn: "Free examination for people in need of social assistance",
    originalPrice: 100,
    discountedPrice: 0,
    discount: 100,
    icon: Heart,
  },
  {
    id: 2,
    name: "Dərman Yardımı",
    nameEn: "Medicine Assistance",
    description: "Əsas dərmanların pulsuz təmin edilməsi",
    descriptionEn: "Free provision of essential medicines",
    originalPrice: 150,
    discountedPrice: 0,
    discount: 100,
    icon: HandHeart,
  },
  {
    id: 3,
    name: "Sosial Müşavirə",
    nameEn: "Social Counseling",
    description: "Sosial işçilərdən pulsuz məsləhət",
    descriptionEn: "Free advice from social workers",
    originalPrice: 80,
    discountedPrice: 0,
    discount: 100,
    icon: Users,
  },
]

const assistanceEquipment = [
  {
    id: 1,
    name: "Tibbi Avadanlıq",
    nameEn: "Medical Equipment",
    description: "Əsas tibbi avadanlıqların pulsuz təmin edilməsi",
    descriptionEn: "Free provision of essential medical equipment",
    originalPrice: 500,
    discountedPrice: 0,
    discount: 100,
  },
  {
    id: 2,
    name: "Qida Əlavələri",
    nameEn: "Food Supplements",
    description: "Vitamin və qida əlavələrinin pulsuz verilməsi",
    descriptionEn: "Free provision of vitamins and food supplements",
    originalPrice: 100,
    discountedPrice: 0,
    discount: 100,
  },
]

export default function AssistanceSupportPage() {
  return (
    <div className="min-h-screen bg-background">
       <Header />
      <Container className="py-12">
        <MotionFadeIn>
          <SectionHeader
            title="Sosial Yardım Dəstəyi"
            subtitle="Sosial yardıma ehtiyacı olan şəxslər üçün pulsuz xidmətlər"
            titleEn="Social Assistance Support"
            subtitleEn="Free services for people in need of social assistance"
          />
        </MotionFadeIn>

        {/* Hero Section */}
        <MotionFadeIn delay={0.1}>
          <Card className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 border-none">
            <CardContent className="p-8 text-center">
              <HandHeart className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Hər Kəsə Bərabər İmkan</h2>
              <p className="text-muted-foreground">
                Sosial vəziyyətindən asılı olmayaraq, hər kəsin keyfiyyətli tibbi xidmətə çıxışı olmalıdır
              </p>
            </CardContent>
          </Card>
        </MotionFadeIn>

        {/* Services Section */}
        <MotionFadeIn delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Pulsuz Xidmətlər</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assistanceServices.map((service) => (
                <Card key={service.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <service.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        PULSUZ
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-green-600">PULSUZ</span>
                      <span className="text-sm text-muted-foreground line-through">{service.originalPrice} ₼</span>
                    </div>
                    <Button className="w-full">Müraciət et</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MotionFadeIn>

        {/* Equipment Section */}
        <MotionFadeIn delay={0.4}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Pulsuz Avadanlıqlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assistanceEquipment.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        PULSUZ
                      </Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-green-600">PULSUZ</span>
                      <span className="text-sm text-muted-foreground line-through">{item.originalPrice} ₼</span>
                    </div>
                    <Button className="w-full">Müraciət et</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MotionFadeIn>

        {/* Requirements Section */}
        <MotionFadeIn delay={0.5}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Müraciət Şərtləri</CardTitle>
              <CardDescription>
                Sosial yardım xidmətlərindən istifadə etmək üçün aşağıdakı sənədlər tələb olunur:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Şəxsiyyət vəsiqəsi</li>
                <li>Sosial yardım arayışı</li>
                <li>Gəlir arayışı (varsa)</li>
                <li>Tibbi arayış (xəstəlik halında)</li>
              </ul>
            </CardContent>
          </Card>
        </MotionFadeIn>

        {/* Contact Section */}
        <MotionFadeIn delay={0.6}>
          <Card className="bg-primary/5">
            <CardContent className="p-8 text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sosial Yardım Xətti</h3>
              <p className="text-muted-foreground mb-4">Sosial yardıma ehtiyacınız varsa, bizimlə əlaqə saxlayın</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/social-dashboard">Sosial Dəstək Paneli</Link>
                </Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  *1236 (Pulsuz)
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionFadeIn>
      </Container>
    </div>
  )
}
