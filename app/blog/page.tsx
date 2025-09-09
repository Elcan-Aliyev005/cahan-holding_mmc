"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

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

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = React.useState<BlogPost[]>([])
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState<string>("all")
  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)

    // Load blog posts from JSON
    fetch("/data/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setFilteredPosts(data)
      })
      .catch((error) => {
        console.error("Error loading blog posts:", error)
      })
  }, [])

  React.useEffect(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [posts, searchQuery, selectedTag])

  const allTags = React.useMemo(() => {
    const tags = Array.from(new Set(posts.flatMap((post) => post.tags)))
    return tags
  }, [posts])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === "az"
      ? date.toLocaleDateString("az-AZ", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20">
        <Container>
          <SectionHeader
            title={language === "az" ? "Tibbi Bloq" : "Medical Blog"}
            description={
              language === "az"
                ? "Sağlamlıq, tibb və müalicə haqqında ən son məqalələr və məsləhətlər"
                : "Latest articles and advice about health, medicine and treatment"
            }
          />

          {/* Search and Filters */}
          <MotionFadeIn delay={0.2} className="mt-12 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === "az" ? "Məqalə axtarın..." : "Search articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tag Filter */}
              <div className="flex items-center gap-4">
                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={language === "az" ? "Kateqoriya" : "Category"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === "az" ? "Bütün kateqoriyalar" : "All categories"}</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground">
                  {filteredPosts.length} {language === "az" ? "məqalə" : "articles"}
                </div>
              </div>
            </div>
          </MotionFadeIn>

          {/* Featured Post */}
          {currentPosts.length > 0 && currentPage === 1 && (
            <MotionSlideUp delay={0.3} className="mt-12">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={currentPosts[0].cover || "/placeholder.svg?height=400&width=600"}
                      alt={currentPosts[0].title}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {language === "az" ? "Öne çıxan" : "Featured"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {currentPosts[0].tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-balance">{currentPosts[0].title}</h2>
                      <p className="text-muted-foreground text-pretty">{currentPosts[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {currentPosts[0].author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(currentPosts[0].date)}
                        </div>
                      </div>
                      <Button asChild className="w-fit">
                        <Link href={`/blog/${currentPosts[0].slug}`}>
                          {language === "az" ? "Oxu" : "Read more"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </MotionSlideUp>
          )}

          {/* Blog Posts Grid */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.slice(currentPage === 1 ? 1 : 0).map((post, index) => (
                <MotionSlideUp key={post.id} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.cover || "/placeholder.svg?height=200&width=400"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardHeader>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.date)}
                        </div>
                      </div>
                      <Button variant="outline" asChild className="w-full bg-transparent">
                        <Link href={`/blog/${post.slug}`}>
                          {language === "az" ? "Oxu" : "Read more"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </MotionSlideUp>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <MotionFadeIn delay={0.4} className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {language === "az" ? "Əvvəlki" : "Previous"}
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage !== page ? "bg-transparent" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-transparent"
                >
                  {language === "az" ? "Növbəti" : "Next"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </MotionFadeIn>
          )}

          {filteredPosts.length === 0 && (
            <MotionFadeIn className="text-center py-12">
              <div className="space-y-4">
                <div className="text-6xl">📝</div>
                <h3 className="text-xl font-semibold">
                  {language === "az" ? "Məqalə tapılmadı" : "No articles found"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "az"
                    ? "Axtarış kriteriyalarınızı dəyişdirməyi cəhd edin"
                    : "Try changing your search criteria"}
                </p>
              </div>
            </MotionFadeIn>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  )
}
