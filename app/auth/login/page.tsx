"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Container } from "@/components/common/Container"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { setAuthState } from "@/lib/storage/local"
import { loginSchema, type LoginFormData } from "@/lib/validators/auth"
import { useToast } from "@/hooks/use-toast"
import { Heart, Mail, Lock, Eye, EyeOff, Users } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let mockUser
      let redirectPath = "/dashboard"

      if (data.email === "sosial@azmedical.az") {
        mockUser = {
          id: "social-1",
          name: "Sosial Yardım İstifadəçisi",
          email: data.email,
          avatar: "/placeholder.svg?height=100&width=100",
          type: "social-support",
          category: "assistance",
        }
        redirectPath = "/social-dashboard"
      } else {
        mockUser = {
          id: "1",
          name: "Əli Məmmədov",
          email: data.email,
          avatar: "/placeholder.svg?height=100&width=100",
          type: "regular",
        }
      }

      const mockToken = `mock_token_${Date.now()}`

      // Save auth state to localStorage
      setAuthState(mockUser, mockToken)

      toast({
        title: language === "az" ? "Uğurla giriş etdiniz!" : "Successfully logged in!",
        description: language === "az" ? "Xoş gəlmisiniz!" : "Welcome back!",
      })

      // Redirect based on user type
      router.push(redirectPath)
    } catch (error) {
      toast({
        title: language === "az" ? "Xəta" : "Error",
        description: language === "az" ? "Giriş zamanı xəta baş verdi" : "An error occurred during login",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20">
        <Container size="sm">
          <MotionFadeIn className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Heart className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{language === "az" ? "Hesaba giriş" : "Sign in to account"}</h1>
            <p className="text-muted-foreground">
              {language === "az"
                ? "Hesabınıza giriş edin və tibbi xidmətlərimizdən yararlanın"
                : "Sign in to your account and access our medical services"}
            </p>
          </MotionFadeIn>

          <MotionSlideUp delay={0.2}>
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle>{language === "az" ? "Giriş" : "Login"}</CardTitle>
                <CardDescription>
                  {language === "az" ? "Məlumatlarınızı daxil edin" : "Enter your credentials"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{language === "az" ? "Email ünvanı" : "Email address"}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        className="pl-10"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{language === "az" ? "Şifrə" : "Password"}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={language === "az" ? "Şifrənizi daxil edin" : "Enter your password"}
                        className="pl-10 pr-10"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        {language === "az" ? "Məni xatırla" : "Remember me"}
                      </Label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      {language === "az" ? "Şifrəni unutmusunuz?" : "Forgot password?"}
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? language === "az"
                        ? "Giriş edilir..."
                        : "Signing in..."
                      : language === "az"
                        ? "Giriş et"
                        : "Sign in"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {language === "az" ? "Hesabınız yoxdur?" : "Don't have an account?"}{" "}
                    <Link href="/auth/register" className="text-primary hover:underline font-medium">
                      {language === "az" ? "Qeydiyyatdan keçin" : "Sign up"}
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionSlideUp>

          {/* Demo Credentials */}
          <MotionSlideUp delay={0.4} className="mt-8 space-y-4">
            <Card className="max-w-md mx-auto bg-muted/30">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 text-center">
                  {language === "az" ? "Demo məlumatları" : "Demo credentials"}
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email: demo@azmedical.az</p>
                  <p>{language === "az" ? "Şifrə" : "Password"}: demo123</p>
                </div>
              </CardContent>
            </Card>

            <Card className="max-w-md mx-auto bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-green-800">
                    {language === "az" ? "Sosial Dəstək Hesabı" : "Social Support Account"}
                  </h3>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <p>Email: sosial@azmedical.az</p>
                  <p>{language === "az" ? "Şifrə" : "Password"}: sosial123</p>
                  <p className="text-xs text-green-600 mt-2">
                    {language === "az"
                      ? "* Sosial yardıma ehtiyacı olan şəxslər üçün xüsusi hesab"
                      : "* Special account for people in need of social assistance"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionSlideUp>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
