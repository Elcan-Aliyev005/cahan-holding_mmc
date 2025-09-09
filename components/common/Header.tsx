"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "./ThemeToggle"
import { LangSwitcher } from "./LangSwitcher"
import { getAuthState } from "@/lib/storage/local"
import { Menu, Heart, ShoppingCart, User, LogOut, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Ana səhifə", href: "/", nameEn: "Home" },
  { name: "Məhsullar", href: "/products", nameEn: "Products" },
  { name: "Xidmətlər", href: "/services", nameEn: "Services" },
  { name: "Bloq", href: "/blog", nameEn: "Blog" },
  { name: "Qiymətlər", href: "/pricing", nameEn: "Pricing" },
  { name: "Haqqımızda", href: "/about", nameEn: "About" },
  { name: "Əlaqə", href: "/contact", nameEn: "Contact" },
]

const socialSupportItems = [
  { name: "Əlillər", href: "/social-support/disabled", nameEn: "Disabled" },
  { name: "Qazilər", href: "/social-support/veterans", nameEn: "Veterans" },
  { name: "Sosial yardım", href: "/social-support/assistance", nameEn: "Social Assistance" },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [authState, setAuthState] = React.useState({ isAuthenticated: false, user: null })
  const [cartCount, setCartCount] = React.useState(0)
  const [language, setLanguage] = React.useState<"az" | "en">("az")

  React.useEffect(() => {
    const auth = getAuthState()
    const cartItemCount =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cart") || "[]").reduce((sum: number, item: any) => sum + item.quantity, 0)
        : 0
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    //@ts-ignore
    setAuthState(auth)
    setCartCount(cartItemCount)
    setLanguage(lang)

    const handleStorageChange = () => {
      const newCartCount =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("cart") || "[]").reduce((sum: number, item: any) => sum + item.quantity, 0)
          : 0
      setCartCount(newCartCount)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    setAuthState({ isAuthenticated: false, user: null })
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 mx-auto max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Heart className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-balance">AzMedical</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition-colors hover:text-foreground/80 ${
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {language === "az" ? item.name : item.nameEn}
              {pathname === item.href && (
                <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`relative transition-colors hover:text-foreground/80 ${
                pathname.startsWith("/social-support") ? "text-foreground" : "text-foreground/60"
              } flex items-center space-x-1`}
            >
              <Users className="h-4 w-4" />
              <span>{language === "az" ? "Sosial Dəstək" : "Social Support"}</span>
              {pathname.startsWith("/social-support") && (
                <motion.div layoutId="activeTab" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {socialSupportItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{language === "az" ? item.name : item.nameEn}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LangSwitcher />

          {/* Cart */}
          <Button variant="ghost" size="sm" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">{cartCount}</Badge>
              )}
            </Link>
          </Button>

          {/* Auth */}
          {authState.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profil</Link>
                </DropdownMenuItem>
              
                {
                 //@ts-ignore
                authState.user?.type === "social-support" && (
                  <DropdownMenuItem asChild>
                    <Link href="/social-dashboard">Sosial Dəstək Paneli</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">İdarə paneli</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Çıxış
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Giriş</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Qeydiyyat</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {language === "az" ? item.name : item.nameEn}
                  </Link>
                ))}

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-foreground/60 mb-2">
                    {language === "az" ? "Sosial Dəstək" : "Social Support"}
                  </h3>
                  {socialSupportItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-medium transition-colors hover:text-primary text-foreground/80 mb-2"
                    >
                      {language === "az" ? item.name : item.nameEn}
                    </Link>
                  ))}
                </div>

                {!authState.isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                      <Link href="/auth/login">Giriş</Link>
                    </Button>
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link href="/auth/register">Qeydiyyat</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
