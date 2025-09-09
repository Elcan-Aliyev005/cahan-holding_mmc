"use client"

import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Award, Heart, Phone } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/common/Header"

const veteranServices = [
  {
    id: 1,
    name: "Qazi Müayinəsi",
    nameEn: "Veteran Examination",
    description: "Qazilər üçün xüsusi tibbi müayinə",
    descriptionEn: "Special medical examination for veterans",
    originalPrice: 120,
    discountedPrice: 36,
    discount: 70,
    icon: Shield,
  },
  {
    id: 2,
    name: "PTSD Müalicəsi",
    nameEn: "PTSD Treatment",
    description: "Post-travmatik stress pozğunluğu müalicəsi",
    descriptionEn: "Post-traumatic stress disorder treatment",
    originalPrice: 200,
    discountedPrice: 60,
    discount: 70,
    icon: Heart,
  },
  {
    id: 3,
    name: "Reabilitasiya",
    nameEn: "Rehabilitation",
    description: "Fiziki və psixoloji reabilitasiya",
    descriptionEn: "Physical and psychological rehabilitation",
    originalPrice: 180,
    discountedPrice: 54,
    discount: 70,
    icon: Award,
  },
]

const veteranEquipment = [
  {
    id: 1,
    name: "Protez Əzaları",
    nameEn: "Prosthetic Limbs",
    description: "Müasir protez əzaları",
    descriptionEn: "Modern prosthetic limbs",
    originalPrice: 2000,
    discountedPrice: 600,
    discount: 70,
  },
  {
    id: 2,
    name: "Ortopedik Dəstək",
    nameEn: "Orthopedic Support",
    description: "Ortopedik dəstək avadanlıqları",
    descriptionEn: "Orthopedic support equipment",
    originalPrice: 300,
    discountedPrice: 90,
    discount: 70,
  },
]

export default function VeteransSupportPage() {
  return (
    <div className="min-h-screen bg-background">
       <Header />
      <Container className="py-12">
        <MotionFadeIn>
          <SectionHeader
            title="Qazilər üçün Sosial Dəstək"
            subtitle="Vətən müdafiəçiləri üçün xüsusi endirimlər və dəstək xidmətləri"
             //@ts-ignore
            titleEn="Social Support for Veterans"
            subtitleEn="Special discounts and support services for homeland defenders"
          />
        </MotionFadeIn>

        {/* Hero Section */}
        <MotionFadeIn delay={0.1}>
          <Card className="mb-12 bg-gradient-to-r from-red-50 to-blue-50 border-none">
            <CardContent className="p-8 text-center">
              <Award className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Qəhrəman Qazilərə Hörmət</h2>
              <p className="text-muted-foreground">
                Vətənimizi müdafiə edən qəhrəmanlarımıza ən yaxşı tibbi xidmət və dəstəyi təqdim edirik
              </p>
            </CardContent>
          </Card>
        </MotionFadeIn>

        {/* Services Section */}
        <MotionFadeIn delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Xidmətlər</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {veteranServices.map((service) => (
                <Card key={service.id} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <service.icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
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
              {veteranEquipment.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
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
              <h3 className="text-xl font-bold mb-2">Qazilər üçün Xüsusi Xətt</h3>
              <p className="text-muted-foreground mb-4">Qəhrəman qazilərə xüsusi diqqət və qayğı ilə yanaşırıq</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/social-dashboard">Sosial Dəstək Paneli</Link>
                </Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  *1235 (Pulsuz)
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionFadeIn>
      </Container>
    </div>
  )
}
