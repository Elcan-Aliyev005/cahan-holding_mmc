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
import { registerSchema, type RegisterFormData } from "@/lib/validators/auth"
import { useToast } from "@/hooks/use-toast"
import { Heart, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock registration - in real app, this would be an API call
      const mockUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        avatar: "/placeholder.svg?height=100&width=100",
      }

      const mockToken = `mock_token_${Date.now()}`

      // Save auth state to localStorage
      setAuthState(mockUser, mockToken)

      toast({
        title: language === "az" ? "Qeydiyyat tamamlandı!" : "Registration completed!",
        description:
          language === "az"
            ? "Hesabınız uğurla yaradıldı. Xoş gəlmisiniz!"
            : "Your account has been created successfully. Welcome!",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: language === "az" ? "Xəta" : "Error",
        description: language === "az" ? "Qeydiyyat zamanı xəta baş verdi" : "An error occurred during registration",
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
            <h1 className="text-3xl font-bold mb-2">{language === "az" ? "Hesab yaradın" : "Create account"}</h1>
            <p className="text-muted-foreground">
              {language === "az"
                ? "Yeni hesab yaradın və tibbi xidmətlərimizdən yararlanın"
                : "Create a new account and access our medical services"}
            </p>
          </MotionFadeIn>

          <MotionSlideUp delay={0.2}>
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle>{language === "az" ? "Qeydiyyat" : "Registration"}</CardTitle>
                <CardDescription>
                  {language === "az" ? "Məlumatlarınızı daxil edin" : "Enter your information"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{language === "az" ? "Ad və Soyad" : "Full Name"}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder={language === "az" ? "Adınızı daxil edin" : "Enter your full name"}
                        className="pl-10"
                        {...register("name")}
                      />
                    </div>
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>

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
                    <Label htmlFor="phone">{language === "az" ? "Telefon nömrəsi" : "Phone number"}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+994 XX XXX XX XX"
                        className="pl-10"
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{language === "az" ? "Şifrə təkrarı" : "Confirm Password"}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={language === "az" ? "Şifrənizi təkrar edin" : "Confirm your password"}
                        className="pl-10 pr-10"
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" {...register("terms")} />
                    <Label htmlFor="terms" className="text-sm">
                      {language === "az" ? "Mən " : "I agree to the "}
                      <Link href="/terms" className="text-primary hover:underline">
                        {language === "az" ? "istifadə şərtləri" : "terms of service"}
                      </Link>
                      {language === "az" ? " və " : " and "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        {language === "az" ? "məxfilik siyasəti" : "privacy policy"}
                      </Link>
                      {language === "az" ? "ni qəbul edirəm" : ""}
                    </Label>
                  </div>
                  {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? language === "az"
                        ? "Qeydiyyat edilir..."
                        : "Creating account..."
                      : language === "az"
                        ? "Hesab yarat"
                        : "Create account"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {language === "az" ? "Artıq hesabınız var?" : "Already have an account?"}{" "}
                    <Link href="/auth/login" className="text-primary hover:underline font-medium">
                      {language === "az" ? "Giriş edin" : "Sign in"}
                    </Link>
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
