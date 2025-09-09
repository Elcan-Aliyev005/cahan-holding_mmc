import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AzMedical - Tibbi Xidmətlər və Məhsullar",
  description: "Azərbaycanda ən yaxşı tibbi xidmətlər və məhsullar. Peşəkar həkimlər və müasir avadanlıqlar.",
  generator: "AzMedical",
  keywords: ["tibbi xidmətlər", "həkim", "sağlamlıq", "Azərbaycan", "medical", "healthcare"],
  authors: [{ name: "AzMedical Team" }],
  openGraph: {
    title: "AzMedical - Tibbi Xidmətlər və Məhsullar",
    description: "Azərbaycanda ən yaxşı tibbi xidmətlər və məhsullar",
    type: "website",
    locale: "az_AZ",
    alternateLocale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="az" className="dark" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
