"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"

const languages = [
  { code: "az", name: "Azərbaycan", flag: "🇦🇿" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

export function LangSwitcher() {
  const [currentLang, setCurrentLang] = React.useState<"az" | "en">("az")

  React.useEffect(() => {
    const savedLang = (localStorage.getItem("language") as "az" | "en") || "az"
    setCurrentLang(savedLang)
  }, [])

  const handleLanguageChange = (langCode: "az" | "en") => {
    setCurrentLang(langCode)
    localStorage.setItem("language", langCode)
    // Trigger a page refresh or state update to apply language changes
    window.location.reload()
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
          <Languages className="h-4 w-4" />
          <span className="text-sm">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code as "az" | "en")}
            className="flex items-center space-x-2"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {currentLang === language.code && (
              <motion.div layoutId="activeLang" className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
