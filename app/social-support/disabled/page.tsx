"use client"

import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, Phone } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/common/Header"

const disabledServices = [
  {
    id: 1,
    name: "Fiziki Terapiya",
    nameEn: "Physical Therapy",
    description: "Əlillər üçün xüsusi fiziki terapiya xidmətləri",
    descriptionEn: "Special physical therapy services for disabled individuals",
    originalPrice: 150,
    discountedPrice: 75,
    discount: 50,
    icon: Heart,
  },
  {
    id: 2,
    name: "Psixoloji Dəstək",
    nameEn: "Psychological Support",
    description: "Peşəkar psixoloqlardan dəstək",
    descriptionEn: "Professional psychological support",
    originalPrice: 100,
    discountedPrice: 40,
    discount: 60,
    icon: Shield,
  },
  {
    id: 3,
    name: "Tibbi Müayinə",
    nameEn: "Medical Examination",
    description: "Ümumi tibbi müayinə və konsultasiya",
    descriptionEn: "General medical examination and consultation",
    originalPrice: 80,
    discountedPrice: 32,
    discount: 60,
    icon: Users,
  },
]

const equipment = [
  {
    id: 1,
    name: "Əlil Arabası",
    nameEn: "Wheelchair",
    description: "Yüksək keyfiyyətli əlil arabaları",
    descriptionEn: "High quality wheelchairs",
    originalPrice: 800,
    discountedPrice: 400,
    discount: 50,
  },
  {
    id: 2,
    name: "Ortopedik Ayaqqabı",
    nameEn: "Orthopedic Shoes",
    description: "Xüsusi ortopedik ayaqqabılar",
    descriptionEn: "Special orthopedic shoes",
    originalPrice: 200,
    discountedPrice: 100,
    discount: 50,
  },
]

export default function DisabledSupportPage() {
  return (
    <div className="min-h-screen bg-background">
       <Header />
      <Container className="py-12">
        <MotionFadeIn>
          <SectionHeader
            title="Əlillər üçün Sosial Dəstək"
            subtitle="Əlil şəxslər üçün xüsusi endirimlər və dəstək xidmətləri"
             //@ts-ignore
            titleEn="Social Support for Disabled"
            subtitleEn="Special discounts and support services for disabled individuals"
          />
        </MotionFadeIn>

        {/* Services Section */}
        <MotionFadeIn delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Xidmətlər</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disabledServices.map((service) => (
                <Card key={service.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <service.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {service.discount}% endirim
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-primary">{service.discountedPrice} ₼</span>
                      <span className="text-sm text-muted-foreground line-through">{service.originalPrice} ₼</span>
                    </div>
                    <Button className="w-full">Rezerv et</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MotionFadeIn>

        {/* Equipment Section */}
        <MotionFadeIn delay={0.4}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Avadanlıqlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipment.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {item.discount}% endirim
                      </Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-primary">{item.discountedPrice} ₼</span>
                      <span className="text-sm text-muted-foreground line-through">{item.originalPrice} ₼</span>
                    </div>
                    <Button className="w-full">Sifariş ver</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MotionFadeIn>

        {/* Contact Section */}
        <MotionFadeIn delay={0.6}>
          <Card className="bg-primary/5">
            <CardContent className="p-8 text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Dəstək Xətti</h3>
              <p className="text-muted-foreground mb-4">
                Əlillər üçün xüsusi dəstək xəttimiz həmişə sizin xidmətinizdədir
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/social-dashboard">Sosial Dəstək Paneli</Link>
                </Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  *1234 (Pulsuz)
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionFadeIn>
      </Container>
    </div>
  )
}
