"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, Phone, Mail } from "lucide-react"
import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { Header } from "@/components/common/Header"

interface PricingPlan {
  id: number
  name: string
  monthly: number
  yearly: number
  features: string[]
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = React.useState(false)
  const [pricingData, setPricingData] = React.useState<PricingPlan[]>([])
  const [language, setLanguage] = React.useState<"az" | "en">("az")

  React.useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch("/data/pricing.json")
        const data = await response.json()
        setPricingData(data)
      } catch (error) {
        console.error("Error loading pricing data:", error)
      }
    }

    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
    fetchPricing()
  }, [])

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12
    const savings = monthlyCost - yearly
    const percentage = Math.round((savings / monthlyCost) * 100)
    return { savings, percentage }
  }

  const faqData = [
    {
      question: "Paketləri necə dəyişə bilərəm?",
      answer: "İstənilən vaxt profil bölməsindən paketinizi yeniləyə və ya azalda bilərsiniz.",
    },
    {
      question: "Ödəniş metodları hansılardır?",
      answer: "Kredit kartı, bank köçürməsi və nağd ödəniş qəbul edirik.",
    },
    {
      question: "Təcili hallarda xidmət varmı?",
      answer: "Bəli, 24/7 təcili yardım xəttimiz mövcuddur.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Container className="py-16">
        <MotionFadeIn>
          <SectionHeader
            title="Qiymət Paketləri"
            subtitle="Sizə uyğun olan paketi seçin və keyfiyyətli tibbi xidmətlərdən yararlanın"
            centered
          />
        </MotionFadeIn>

        {/* Billing Toggle */}
        <MotionSlideUp delay={0.2}>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>Aylıq</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-primary" />
            <span className={`text-sm ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>İllik</span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                20% endirim
              </Badge>
            )}
          </div>
        </MotionSlideUp>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingData.map((plan, index) => {
            const price = isYearly ? plan.yearly : plan.monthly
            const savings = isYearly ? calculateSavings(plan.monthly, plan.yearly) : null
            const isPopular = index === 1

            return (
              <MotionSlideUp key={plan.id} delay={0.1 * index}>
                <Card className={`relative h-full ${isPopular ? "border-primary shadow-lg scale-105" : ""}`}>
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Ən Populyar
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">₼{price}</span>
                      <span className="text-muted-foreground ml-1">/{isYearly ? "il" : "ay"}</span>
                    </div>
                    {savings && (
                      <div className="text-sm text-green-600 mt-2">
                        ₼{savings.savings.toFixed(2)} qənaət ({savings.percentage}% endirim)
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="pt-8">
                    <Button className="w-full" variant={isPopular ? "default" : "outline"} size="lg">
                      Paketi Seç
                    </Button>
                  </CardFooter>
                </Card>
              </MotionSlideUp>
            )
          })}
        </div>

        {/* FAQ Section */}
        <MotionFadeIn delay={0.4}>
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Tez-tez Verilən Suallar"
              subtitle="Qiymət paketləri haqqında ən çox soruşulan suallar"
              centered
            />

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MotionFadeIn>

        {/* Contact CTA */}
        <MotionSlideUp delay={0.6}>
          <Card className="mt-16 bg-primary/5 border-primary/20">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Hələ də qərar verə bilmirsiniz?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Mütəxəssislərimizlə əlaqə saxlayın və sizə uyğun olan paketi birlikdə seçək
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Phone className="w-4 h-4" />
                  *1234 - Qaynar Xətt
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                  info@azmedical.az
                </Button>
              </div>
            </CardContent>
          </Card>
        </MotionSlideUp>
      </Container>
    </div>
  )
}
