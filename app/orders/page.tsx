"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, Calendar, CreditCard, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/common/Container"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"

interface Order {
  orderNumber: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  paymentMethod: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    // Add mock status for demo
    const ordersWithStatus = savedOrders.map((order: Order) => ({
      ...order,
      status: "processing" as const,
    }))
    setOrders(ordersWithStatus)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
      case "processing":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-300"
      case "shipped":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-300"
      case "delivered":
        return "bg-green-500/20 text-green-700 dark:text-green-300"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Gözləyir"
      case "processing":
        return "İşlənir"
      case "shipped":
        return "Göndərildi"
      case "delivered":
        return "Çatdırıldı"
      default:
        return "Naməlum"
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "card":
        return "Kredit Kartı"
      case "bank":
        return "Bank Köçürməsi"
      case "mobile":
        return "Mobil Ödəmə"
      default:
        return method
    }
  }

  if (orders.length === 0) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">Sifarişiniz yoxdur</h1>
          <p className="text-muted-foreground mb-8">
            Hələ heç bir sifariş verməmisiniz. İlk sifarişinizi vermək üçün məhsullara baxın.
          </p>
          <Button onClick={() => (window.location.href = "/products")}>Məhsullara bax</Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <MotionFadeIn>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Sifarişlərim</h1>

          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.orderNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Sifariş #{order.orderNumber}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString("az-AZ")}
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            {getPaymentMethodText(order.paymentMethod)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                        <p className="text-lg font-bold mt-2">{order.total.toFixed(2)} ₼</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              Miqdar: {item.quantity} × {item.price.toFixed(2)} ₼
                            </p>
                          </div>
                          <p className="font-semibold text-sm">{(item.price * item.quantity).toFixed(2)} ₼</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ətraflı
                      </Button>
                      {order.status === "delivered" && <Button size="sm">Yenidən sifariş et</Button>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionFadeIn>
    </Container>
  )
}
