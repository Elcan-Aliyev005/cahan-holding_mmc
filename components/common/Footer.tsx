"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  services: [
    { name: "Kardioloji", href: "/services#cardiology", nameEn: "Cardiology" },
    { name: "Laborator", href: "/services#laboratory", nameEn: "Laboratory" },
    { name: "Radioloji", href: "/services#radiology", nameEn: "Radiology" },
    { name: "Fizioterapiya", href: "/services#physiotherapy", nameEn: "Physiotherapy" },
  ],
  company: [
    { name: "Haqqımızda", href: "/about", nameEn: "About Us" },
    { name: "Komandamız", href: "/about#team", nameEn: "Our Team" },
    { name: "Karyera", href: "/about#careers", nameEn: "Careers" },
    { name: "Əlaqə", href: "/contact", nameEn: "Contact" },
  ],
  resources: [
    { name: "Bloq", href: "/blog", nameEn: "Blog" },
    { name: "Suallar", href: "/faq", nameEn: "FAQ" },
    { name: "Dəstək", href: "/support", nameEn: "Support" },
    { name: "Siyasət", href: "/privacy", nameEn: "Privacy Policy" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
]

export function Footer() {
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
    // Show toast notification here
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto max-w-screen-2xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Heart className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">AzMedical</span>
            </Link>
            <p className="text-sm text-muted-foreground text-pretty">
              {language === "az"
                ? "Azərbaycanda ən yaxşı tibbi xidmətlər və məhsullar. Sağlamlığınız bizim prioritetimizdir."
                : "The best medical services and products in Azerbaijan. Your health is our priority."}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Bakı, Azərbaycan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+994 12 345 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@azmedical.az</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{language === "az" ? "Xidmətlər" : "Services"}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {language === "az" ? link.name : link.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{language === "az" ? "Şirkət" : "Company"}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {language === "az" ? link.name : link.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{language === "az" ? "Xəbər bülleteni" : "Newsletter"}</h3>
            <p className="text-sm text-muted-foreground">
              {language === "az"
                ? "Yeniliklər və sağlamlıq məsləhətləri üçün abunə olun"
                : "Subscribe for updates and health tips"}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder={language === "az" ? "E-mail ünvanınız" : "Your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm" className="w-full">
                {language === "az" ? "Abunə ol" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 AzMedical. {language === "az" ? "Bütün hüquqlar qorunur." : "All rights reserved."}
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
