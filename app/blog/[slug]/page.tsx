"use client"

import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Container } from "@/components/common/Container"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { Calendar, User, Clock, ArrowLeft, BookOpen } from "lucide-react"

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  cover: string
  tags: string[]
  date: string
  author: string
}

interface TOCItem {
  id: string
  title: string
  level: number
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = React.useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([])
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [toc, setToc] = React.useState<TOCItem[]>([])
  const [activeSection, setActiveSection] = React.useState<string>("")
  const [readingTime, setReadingTime] = React.useState(0)

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)

    // Load blog posts from JSON
    fetch("/data/blog.json")
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        const currentPost = data.find((p) => p.slug === params.slug)
        if (!currentPost) {
          notFound()
          return
        }

        setPost(currentPost)

        // Calculate reading time (average 200 words per minute)
        const wordCount = currentPost.content.replace(/<[^>]*>/g, "").split(/\s+/).length
        setReadingTime(Math.ceil(wordCount / 200))

        // Generate table of contents from content
        const headings = currentPost.content.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi) || []
        const tocItems: TOCItem[] = headings.map((heading, index) => {
          const level = Number.parseInt(heading.match(/<h([2-4])/)?.[1] || "2")
          const title = heading.replace(/<[^>]*>/g, "")
          const id = `heading-${index}`
          return { id, title, level }
        })
        setToc(tocItems)

        // Find related posts (same tags)
        const related = data
          .filter((p) => p.id !== currentPost.id && p.tags.some((tag) => currentPost.tags.includes(tag)))
          .slice(0, 3)
        setRelatedPosts(related)
      })
      .catch((error) => {
        console.error("Error loading blog post:", error)
      })
  }, [params.slug])

  React.useEffect(() => {
    // Add IDs to headings for TOC navigation
    if (post) {
      const headings = document.querySelectorAll("h2, h3, h4")
      headings.forEach((heading, index) => {
        heading.id = `heading-${index}`
      })

      // Intersection Observer for active section
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        { rootMargin: "-20% 0px -80% 0px" },
      )

      headings.forEach((heading) => observer.observe(heading))

      return () => observer.disconnect()
    }
  }, [post])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === "az"
      ? date.toLocaleDateString("az-AZ", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Container className="py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-2xl font-bold mb-2">{language === "az" ? "Məqalə tapılmadı" : "Article not found"}</h1>
            <p className="text-muted-foreground mb-4">
              {language === "az" ? "Axtardığınız məqalə mövcud deyil" : "The article you're looking for doesn't exist"}
            </p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "az" ? "Bloqa qayıt" : "Back to blog"}
              </Link>
            </Button>
          </div>
        </Container>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="py-12">
        <Container>
          {/* Breadcrumb */}
          <MotionFadeIn className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                {language === "az" ? "Ana səhifə" : "Home"}
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                {language === "az" ? "Bloq" : "Blog"}
              </Link>
              <span>/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>
          </MotionFadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {language === "az" ? "Məzmun" : "Table of Contents"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        style={{ paddingLeft: `${(item.level - 2) * 12 + 8}px` }}
                      >
                        {item.title}
                      </button>
                    ))}
                  </CardContent>
                </Card>

                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {language === "az" ? "Bloqa qayıt" : "Back to blog"}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Article Header */}
              <MotionSlideUp>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">{post.title}</h1>

                  <p className="text-xl text-muted-foreground text-pretty">{post.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {readingTime} {language === "az" ? "dəqiqə oxu" : "min read"}
                    </div>
                  </div>
                </div>
              </MotionSlideUp>

              {/* Featured Image */}
              <MotionSlideUp delay={0.1}>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={post.cover || "/placeholder.svg?height=400&width=800"}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              </MotionSlideUp>

              {/* Article Content */}
              <MotionSlideUp delay={0.2}>
                <div
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </MotionSlideUp>

              {/* Article Footer */}
              <MotionSlideUp delay={0.3}>
                <div className="space-y-6">
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {language === "az" ? "Etiketlər:" : "Tags:"}
                    </span>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </MotionSlideUp>

              {/* Mobile TOC */}
              <div className="lg:hidden">
                <MotionSlideUp delay={0.4}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {language === "az" ? "Məzmun" : "Table of Contents"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="block w-full text-left text-sm py-1 px-2 rounded transition-colors text-muted-foreground hover:text-foreground"
                          style={{ paddingLeft: `${(item.level - 2) * 12 + 8}px` }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </MotionSlideUp>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <MotionSlideUp delay={0.5}>
                  <div className="space-y-6">
                    <Separator />
                    <h2 className="text-2xl font-bold">{language === "az" ? "Oxşar məqalələr" : "Related articles"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow duration-300">
                          <div className="relative overflow-hidden">
                            <img
                              src={relatedPost.cover || "/placeholder.svg?height=150&width=300"}
                              alt={relatedPost.title}
                              className="w-full h-32 object-cover"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base line-clamp-2">
                              <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                                {relatedPost.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="line-clamp-2">{relatedPost.excerpt}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="text-xs text-muted-foreground">{formatDate(relatedPost.date)}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </MotionSlideUp>
              )}

              {/* Navigation */}
              <MotionSlideUp delay={0.6}>
                <div className="flex justify-center">
                  <Button asChild>
                    <Link href="/blog">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {language === "az" ? "Bloqa qayıt" : "Back to blog"}
                    </Link>
                  </Button>
                </div>
              </MotionSlideUp>
            </div>
          </div>
        </Container>
      </article>

      <Footer />
    </div>
  )
}
