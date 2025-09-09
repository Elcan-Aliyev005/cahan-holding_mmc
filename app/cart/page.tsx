"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Container } from "@/components/common/Container"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { getCart, updateCartQuantity, removeFromCart, clearCart, type CartItem } from "@/lib/storage/local"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/common/Header"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [language, setLanguage] = useState<"az" | "en">("az")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
    loadCart()
  }, [])

  const loadCart = () => {
    const cart = getCart()
    setCartItems(cart)
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartQuantity(id, newQuantity)
    loadCart()
  }

  const handleRemoveItem = (id: number, title: string) => {
    removeFromCart(id)
    loadCart()
    toast({
      title: language === "az" ? "Məhsul silindi" : "Item removed",
      description: `${title} ${language === "az" ? "səbətdən silindi" : "has been removed from cart"}`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    loadCart()
    toast({
      title: language === "az" ? "Səbət təmizləndi" : "Cart cleared",
      description: language === "az" ? "Bütün məhsullar səbətdən silindi" : "All items have been removed from cart",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.18 // 18% KDV
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
    <>
    <Header/>
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {language === "az" ? "Səbətiniz boşdur" : "Your cart is empty"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === "az"
              ? "Səbətinizə məhsul əlavə etmək üçün məhsullara baxın."
              : "Browse our products to add items to your cart."}
          </p>
          <Button onClick={() => router.push("/products")}>
            {language === "az" ? "Məhsullara bax" : "Browse Products"}
          </Button>
        </div>
      </Container>
    </>
    )
  }

  return (
    <Container className="py-12">
      <MotionFadeIn>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {language === "az" ? "Alış-veriş səbəti" : "Shopping Cart"}
            </h1>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {language === "az" ? "Səbəti təmizlə" : "Clear Cart"}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-2xl font-bold text-primary mt-1">{item.price.toFixed(2)} ₼</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 h-8 text-center border-0 bg-transparent"
                              min="1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right min-w-[80px]">
                            <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} ₼</p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id, item.title)}
                            className="text-destructive hover:text-destructive h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-24">
                <CardHeader>
                  <CardTitle>{language === "az" ? "Sifariş xülasəsi" : "Order Summary"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{language === "az" ? "Ara cəm:" : "Subtotal:"}</span>
                      <span>{subtotal.toFixed(2)} ₼</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === "az" ? "Çatdırılma:" : "Shipping:"}</span>
                      <span>
                        {shipping === 0 ? (language === "az" ? "Pulsuz" : "Free") : `${shipping.toFixed(2)} ₼`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>KDV (18%):</span>
                      <span>{tax.toFixed(2)} ₼</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>{language === "az" ? "Cəmi:" : "Total:"}</span>
                      <span>{total.toFixed(2)} ₼</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button className="w-full" size="lg" onClick={() => router.push("/checkout")}>
                      {language === "az" ? "Ödəməyə keç" : "Proceed to Checkout"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => router.push("/products")}
                    >
                      {language === "az" ? "Alış-verişə davam et" : "Continue Shopping"}
                    </Button>
                  </div>

                  {subtotal < 100 && (
                    <div className="bg-accent/50 p-3 rounded-lg text-sm">
                      <p className="text-center">
                        {language === "az"
                          ? `Pulsuz çatdırılma üçün daha ${(100 - subtotal).toFixed(2)} ₼ əlavə edin!`
                          : `Add ${(100 - subtotal).toFixed(2)} ₼ more for free shipping!`}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MotionFadeIn>
    </Container>
  )
}
