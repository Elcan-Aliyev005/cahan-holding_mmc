"use client"

import { Container } from "@/components/common/Container"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Phone, Video, Send, Clock, Heart } from "lucide-react"
import { useState } from "react"

const doctors = [
  {
    id: 1,
    name: "Dr. Aysel Məmmədova",
    specialty: "Ümumi həkim",
    status: "online",
    avatar: "/caring-doctor.png",
  },
  {
    id: 2,
    name: "Dr. Rəşad Əliyev",
    specialty: "Kardioloq",
    status: "online",
    avatar: "/cardiologist.png",
  },
  {
    id: 3,
    name: "Dr. Günel Həsənova",
    specialty: "Psixoloq",
    status: "busy",
    avatar: "/psychologist.png",
  },
]

const chatMessages = [
  {
    id: 1,
    sender: "Dr. Aysel Məmmədova",
    message: "Salam! Sizə necə kömək edə bilərəm?",
    time: "14:30",
    isDoctor: true,
  },
  {
    id: 2,
    sender: "Siz",
    message: "Salam doktor, baş ağrım var",
    time: "14:32",
    isDoctor: false,
  },
  {
    id: 3,
    sender: "Dr. Aysel Məmmədova",
    message: "Baş ağrınız nə vaxtdan davam edir? Başqa simptomlarınız varmı?",
    time: "14:33",
    isDoctor: true,
  },
]

export default function SocialDashboardPage() {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(chatMessages)

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "Siz",
        message: newMessage,
        time: new Date().toLocaleTimeString("az-AZ", { hour: "2-digit", minute: "2-digit" }),
        isDoctor: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8">
        <MotionFadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Sosial Dəstək Paneli</h1>
            <p className="text-muted-foreground">24/7 həkim dəstəyi və sosial yardım xidmətləri</p>
          </div>
        </MotionFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <MotionFadeIn delay={0.1}>
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5" />
                        <span>Həkim Çatı</span>
                      </CardTitle>
                      <CardDescription>Həkimlərlə birbaşa əlaqə saxlayın</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <div className="h-full flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isDoctor ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isDoctor ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Mesajınızı yazın..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionFadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Doctors */}
            <MotionFadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Aktiv Həkimlər</CardTitle>
                  <CardDescription>Hazırda xəttdə olan həkimlər</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={doctor.avatar || "/placeholder.svg"}
                          alt={doctor.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                            doctor.status === "online" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{doctor.name}</p>
                        <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                      </div>
                      <Badge variant={doctor.status === "online" ? "default" : "secondary"}>
                        {doctor.status === "online" ? "Aktiv" : "Məşğul"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </MotionFadeIn>

            {/* Quick Actions */}
            <MotionFadeIn delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tez Əlaqə</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Təcili Yardım: *103
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
                    Sosial Xətt: *1234
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Randevu Al
                  </Button>
                </CardContent>
              </Card>
            </MotionFadeIn>

            {/* Support Info */}
            <MotionFadeIn delay={0.4}>
              <Card className="bg-primary/5">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-medium mb-1">24/7 Dəstək</h3>
                  <p className="text-xs text-muted-foreground">Həmişə yanınızdayıq</p>
                </CardContent>
              </Card>
            </MotionFadeIn>
          </div>
        </div>
      </Container>
    </div>
  )
}
