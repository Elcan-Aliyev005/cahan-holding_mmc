"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Container } from "@/components/common/Container"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { getAuthState, clearAuthState, setTheme, setLanguage as setStorageLanguage } from "@/lib/storage/local"
import { profileSchema, type ProfileFormData } from "@/lib/validators/auth"
import { useToast } from "@/hooks/use-toast"
import { User, Shield, Bell, Palette, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [authState, setAuthState] = React.useState({ isAuthenticated: false, user: null })
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    dataSharing: false,
  })

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)

    const auth = getAuthState()
    if (!auth.isAuthenticated) {
      router.push("/auth/login")
      return
    }
    setAuthState(auth)
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: authState.user?.name || "",
      email: authState.user?.email || "",
      phone: "",
      dateOfBirth: "",
      address: "",
      emergencyContact: "",
    },
  })

  React.useEffect(() => {
    if (authState.user) {
      reset({
        name: authState.user.name,
        email: authState.user.email,
        phone: "",
        dateOfBirth: "",
        address: "",
        emergencyContact: "",
      })
    }
  }, [authState.user, reset])

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock profile update
      const updatedUser = {
        ...authState.user,
        name: data.name,
        email: data.email,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      toast({
        title: language === "az" ? "Profil yeniləndi!" : "Profile updated!",
        description:
          language === "az" ? "Məlumatlarınız uğurla yeniləndi" : "Your information has been updated successfully",
      })
    } catch (error) {
      toast({
        title: language === "az" ? "Xəta" : "Error",
        description:
          language === "az" ? "Profil yeniləmə zamanı xəta baş verdi" : "An error occurred while updating profile",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    clearAuthState()
    toast({
      title: language === "az" ? "Çıxış edildi" : "Logged out",
      description: language === "az" ? "Hesabınızdan uğurla çıxış etdiniz" : "You have been logged out successfully",
    })
    router.push("/")
  }

  const handleThemeChange = (isDark: boolean) => {
    const theme = isDark ? "dark" : "light"
    setTheme(theme)
    document.documentElement.classList.toggle("dark", isDark)
  }

  const handleLanguageChange = (isEnglish: boolean) => {
    const newLang = isEnglish ? "en" : "az"
    setStorageLanguage(newLang)
    setLanguage(newLang)
    window.location.reload() // Reload to apply language changes
  }

  if (!authState.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20">
        <Container>
          <MotionFadeIn className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{language === "az" ? "Profil" : "Profile"}</h1>
                <p className="text-muted-foreground">
                  {language === "az" ? "Hesab məlumatlarınızı idarə edin" : "Manage your account information"}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="bg-transparent">
                <LogOut className="mr-2 h-4 w-4" />
                {language === "az" ? "Çıxış" : "Logout"}
              </Button>
            </div>
          </MotionFadeIn>

          <MotionSlideUp delay={0.2}>
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">{language === "az" ? "Profil" : "Profile"}</TabsTrigger>
                <TabsTrigger value="settings">{language === "az" ? "Tənzimləmələr" : "Settings"}</TabsTrigger>
                <TabsTrigger value="security">{language === "az" ? "Təhlükəsizlik" : "Security"}</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {language === "az" ? "Şəxsi məlumatlar" : "Personal Information"}
                    </CardTitle>
                    <CardDescription>
                      {language === "az" ? "Profil məlumatlarınızı yeniləyin" : "Update your profile information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{language === "az" ? "Ad və Soyad" : "Full Name"}</Label>
                          <Input id="name" {...register("name")} />
                          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">{language === "az" ? "Email ünvanı" : "Email address"}</Label>
                          <Input id="email" type="email" {...register("email")} />
                          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">{language === "az" ? "Telefon nömrəsi" : "Phone number"}</Label>
                          <Input id="phone" type="tel" {...register("phone")} />
                          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">{language === "az" ? "Doğum tarixi" : "Date of birth"}</Label>
                          <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">{language === "az" ? "Ünvan" : "Address"}</Label>
                        <Input id="address" {...register("address")} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">
                          {language === "az" ? "Təcili əlaqə nömrəsi" : "Emergency contact"}
                        </Label>
                        <Input id="emergencyContact" type="tel" {...register("emergencyContact")} />
                      </div>

                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                          ? language === "az"
                            ? "Yenilənir..."
                            : "Updating..."
                          : language === "az"
                            ? "Məlumatları yenilə"
                            : "Update information"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      {language === "az" ? "Görünüş" : "Appearance"}
                    </CardTitle>
                    <CardDescription>
                      {language === "az" ? "Tema və dil tənzimləmələri" : "Theme and language settings"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{language === "az" ? "Qaranlıq tema" : "Dark theme"}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "az" ? "Qaranlıq rejimi aktiv edin" : "Enable dark mode"}
                        </p>
                      </div>
                      <Switch
                        defaultChecked={document.documentElement.classList.contains("dark")}
                        onCheckedChange={handleThemeChange}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{language === "az" ? "İngilis dili" : "English language"}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "az" ? "İnterfeys dilini dəyişin" : "Change interface language"}
                        </p>
                      </div>
                      <Switch defaultChecked={language === "en"} onCheckedChange={handleLanguageChange} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      {language === "az" ? "Bildirişlər" : "Notifications"}
                    </CardTitle>
                    <CardDescription>
                      {language === "az"
                        ? "Bildiriş tənzimləmələrinizi idarə edin"
                        : "Manage your notification preferences"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{language === "az" ? "Email bildirişləri" : "Email notifications"}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "az"
                            ? "Randevu və xəbərlər haqqında email alın"
                            : "Receive emails about appointments and news"}
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{language === "az" ? "SMS bildirişləri" : "SMS notifications"}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "az"
                            ? "Təcili bildirişlər üçün SMS alın"
                            : "Receive SMS for urgent notifications"}
                        </p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsNotifications: checked }))}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{language === "az" ? "Marketinq emailləri" : "Marketing emails"}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "az"
                            ? "Yeni xidmətlər haqqında məlumat alın"
                            : "Receive information about new services"}
                        </p>
                      </div>
                      <Switch
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, marketingEmails: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {language === "az" ? "Təhlükəsizlik tənzimləmələri" : "Security Settings"}
                    </CardTitle>
                    <CardDescription>
                      {language === "az" ? "Hesabınızın təhlükəsizliyini artırın" : "Enhance your account security"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{language === "az" ? "İki faktorlu doğrulama" : "Two-factor authentication"}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "az"
                            ? "Hesabınız üçün əlavə təhlükəsizlik"
                            : "Add extra security to your account"}
                        </p>
                      </div>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, twoFactorAuth: checked }))}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{language === "az" ? "Məlumat paylaşımı" : "Data sharing"}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "az"
                            ? "Tibbi məlumatları tədqiqat üçün paylaşın"
                            : "Share medical data for research"}
                        </p>
                      </div>
                      <Switch
                        checked={settings.dataSharing}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, dataSharing: checked }))}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Button variant="outline" className="w-full bg-transparent">
                        {language === "az" ? "Şifrəni dəyiş" : "Change password"}
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        {language === "az" ? "Giriş tarixçəsi" : "Login history"}
                      </Button>
                      <Button variant="destructive" className="w-full">
                        {language === "az" ? "Hesabı sil" : "Delete account"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </MotionSlideUp>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
