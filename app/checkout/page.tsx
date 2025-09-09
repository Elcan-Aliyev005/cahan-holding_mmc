"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CreditCard, Building2, Smartphone, Shield, ArrowLeft, Check, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Container } from "@/components/common/Container"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"

// Payment validation schema
const paymentSchema = z
  .object({
    paymentMethod: z.enum(["card", "bank", "mobile"]),
    // Card details
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    cardName: z.string().optional(),
    // Billing address
    firstName: z.string().min(2, "Ad minimum 2 hərf olmalıdır"),
    lastName: z.string().min(2, "Soyad minimum 2 hərf olmalıdır"),
    email: z.string().email("Düzgün email daxil edin"),
    phone: z.string().min(10, "Telefon nömrəsi minimum 10 rəqəm olmalıdır"),
    address: z.string().min(5, "Ünvan minimum 5 hərf olmalıdır"),
    city: z.string().min(2, "Şəhər minimum 2 hərf olmalıdır"),
    postalCode: z.string().min(4, "Poçt kodu minimum 4 rəqəm olmalıdır"),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return data.cardNumber && data.expiryDate && data.cvv && data.cardName
      }
      return true
    },
    {
      message: "Kart məlumatları tələb olunur",
      path: ["cardNumber"],
    },
  )

type PaymentFormData = z.infer<typeof paymentSchema>

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  })

  const watchPaymentMethod = form.watch("paymentMethod")

  useEffect(() => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const mappedCart = cart.map((item: any) => ({
      ...item,
      id: item.id.toString(),
      name: item.title, // Map title to name for display
    }))
    setCartItems(mappedCart)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.18 // 18% KDV
  const total = subtotal + shipping + tax

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock payment success
    const orderNumber = `AZ${Date.now()}`

    // Clear cart
    localStorage.removeItem("cart")

    // Save order to localStorage
    const order = {
      orderNumber,
      items: cartItems,
      total,
      paymentMethod: data.paymentMethod,
      billingInfo: data,
      date: new Date().toISOString(),
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))

    setOrderComplete(true)
    setIsProcessing(false)

    toast({
      title: "Ödəmə uğurla tamamlandı!",
      description: `Sifariş nömrəsi: ${orderNumber}`,
    })
  }

  if (orderComplete) {
    return (
      <Container className="py-12">
        <MotionFadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Sifarişiniz təsdiqləndi!</h1>
            <p className="text-muted-foreground mb-8">
              Ödəməniz uğurla həyata keçirildi. Sifarişiniz tezliklə hazırlanacaq.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.push("/products")}>Alış-verişə davam et</Button>
              <Button variant="outline" onClick={() => router.push("/profile")}>
                Sifarişlərim
              </Button>
            </div>
          </div>
        </MotionFadeIn>
      </Container>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Səbətiniz boşdur</h1>
          <p className="text-muted-foreground mb-8">Ödəmə etmək üçün səbətinizə məhsul əlavə edin.</p>
          <Button onClick={() => router.push("/products")}>Məhsullara bax</Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <MotionFadeIn>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Ödəmə</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Ödəmə Metodu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div>
                      <Label className="text-base font-medium">Ödəmə növü seçin</Label>
                      <RadioGroup
                        value={watchPaymentMethod}
                        onValueChange={(value) => form.setValue("paymentMethod", value as any)}
                        className="mt-3"
                      >
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="card" id="card" />
                          <CreditCard className="w-5 h-5 text-primary" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            Kredit/Debit Kart
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="bank" id="bank" />
                          <Building2 className="w-5 h-5 text-primary" />
                          <Label htmlFor="bank" className="flex-1 cursor-pointer">
                            Bank Köçürməsi
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="mobile" id="mobile" />
                          <Smartphone className="w-5 h-5 text-primary" />
                          <Label htmlFor="mobile" className="flex-1 cursor-pointer">
                            Mobil Ödəmə
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Card Details */}
                    {watchPaymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="cardNumber">Kart Nömrəsi</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              {...form.register("cardNumber")}
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Son İstifadə Tarixi</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                {...form.register("expiryDate")}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" {...form.register("cvv")} className="mt-1" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="cardName">Kart Sahibinin Adı</Label>
                            <Input
                              id="cardName"
                              placeholder="Ad Soyad"
                              {...form.register("cardName")}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Billing Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Faktura Məlumatları</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Ad</Label>
                          <Input id="firstName" {...form.register("firstName")} className="mt-1" />
                          {form.formState.errors.firstName && (
                            <p className="text-sm text-destructive mt-1">{form.formState.errors.firstName.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Soyad</Label>
                          <Input id="lastName" {...form.register("lastName")} className="mt-1" />
                          {form.formState.errors.lastName && (
                            <p className="text-sm text-destructive mt-1">{form.formState.errors.lastName.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" {...form.register("email")} className="mt-1" />
                          {form.formState.errors.email && (
                            <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefon</Label>
                          <Input id="phone" {...form.register("phone")} className="mt-1" />
                          {form.formState.errors.phone && (
                            <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Ünvan</Label>
                        <Input id="address" {...form.register("address")} className="mt-1" />
                        {form.formState.errors.address && (
                          <p className="text-sm text-destructive mt-1">{form.formState.errors.address.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Şəhər</Label>
                          <Input id="city" {...form.register("city")} className="mt-1" />
                          {form.formState.errors.city && (
                            <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Poçt Kodu</Label>
                          <Input id="postalCode" {...form.register("postalCode")} className="mt-1" />
                          {form.formState.errors.postalCode && (
                            <p className="text-sm text-destructive mt-1">{form.formState.errors.postalCode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          İşlənir...
                        </div>
                      ) : (
                        `${total.toFixed(2)} ₼ Ödə`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sifariş Xülasəsi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name || item.title}</h4>
                        <p className="text-sm text-muted-foreground">Miqdar: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} ₼</p>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Ara cəm:</span>
                      <span>{subtotal.toFixed(2)} ₼</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Çatdırılma:</span>
                      <span>{shipping === 0 ? "Pulsuz" : `${shipping.toFixed(2)} ₼`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>KDV (18%):</span>
                      <span>{tax.toFixed(2)} ₼</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Cəmi:</span>
                      <span>{total.toFixed(2)} ₼</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Təhlükəsiz Ödəmə</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Bütün ödəmələr SSL şifrələməsi ilə qorunur. Kart məlumatlarınız saxlanılmır.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MotionFadeIn>
    </Container>
  )
}
