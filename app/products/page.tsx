"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { Container } from "@/components/common/Container"
import { SectionHeader } from "@/components/common/SectionHeader"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { addToCart } from "@/lib/storage/local"
import { useToast } from "@/hooks/use-toast"
import { Search, Grid3X3, List, Star, ShoppingCart, Heart, SlidersHorizontal } from "lucide-react"

interface Product {
  id: number
  title: string
  slug: string
  price: number
  category: string
  rating: number
  images: string[]
  tags: string[]
  description: string
}

export default function ProductsPage() {
  const { toast } = useToast()
  const [products, setProducts] = React.useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([])
  const [language, setLanguage] = React.useState<"az" | "en">("az")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [priceRange, setPriceRange] = React.useState([0, 500])
  const [sortBy, setSortBy] = React.useState("name")
  const [showFilters, setShowFilters] = React.useState(false)

  React.useEffect(() => {
    const lang = (localStorage.getItem("language") as "az" | "en") || "az"
    setLanguage(lang)

    // Load products from JSON
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch((error) => {
        console.error("Error loading products:", error)
      })
  }, [])

  React.useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.title.localeCompare(b.title)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, priceRange, sortBy])

  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)))
    return cats
  }, [products])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || "/placeholder.svg",
    })

    toast({
      title: language === "az" ? "Səbətə əlavə edildi" : "Added to cart",
      description: `${product.title} ${language === "az" ? "səbətə əlavə edildi" : "has been added to cart"}`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20">
        <Container>
          <SectionHeader
            title={language === "az" ? "Tibbi Məhsullar" : "Medical Products"}
            description={
              language === "az"
                ? "Yüksək keyfiyyətli tibbi məhsullar və avadanlıqlar"
                : "High quality medical products and equipment"
            }
          />

          {/* Search and Filters */}
          <MotionFadeIn delay={0.2} className="mt-12 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === "az" ? "Məhsul axtarın..." : "Search products..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* View Toggle and Filters */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {language === "az" ? "Filtrlər" : "Filters"}
                </Button>

                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? "block" : "hidden lg:grid"}`}>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "az" ? "Kateqoriya" : "Category"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "az" ? "Bütün kateqoriyalar" : "All categories"}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "az" ? "Qiymət aralığı" : "Price range"}: {priceRange[0]} - {priceRange[1]} AZN
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "az" ? "Sıralama" : "Sort by"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{language === "az" ? "Ad" : "Name"}</SelectItem>
                  <SelectItem value="price-low">{language === "az" ? "Qiymət (aşağı)" : "Price (Low)"}</SelectItem>
                  <SelectItem value="price-high">{language === "az" ? "Qiymət (yüksək)" : "Price (High)"}</SelectItem>
                  <SelectItem value="rating">{language === "az" ? "Reytinq" : "Rating"}</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-muted-foreground flex items-center">
                {filteredProducts.length} {language === "az" ? "məhsul tapıldı" : "products found"}
              </div>
            </div>
          </MotionFadeIn>

          {/* Products Grid/List */}
          <div className="mt-12">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <MotionSlideUp key={product.id} delay={index * 0.05}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=200&width=300"}
                          alt={product.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary">{product.price} AZN</div>
                          <Button size="sm" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {language === "az" ? "Səbətə at" : "Add to cart"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </MotionSlideUp>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <MotionSlideUp key={product.id} delay={index * 0.05}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img
                            src={product.images[0] || "/placeholder.svg?height=200&width=300"}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-semibold">{product.title}</h3>
                                <Badge variant="secondary">{product.category}</Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="text-sm font-medium">{product.rating}</span>
                              </div>
                              <p className="text-muted-foreground">{product.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {product.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="text-2xl font-bold text-primary">{product.price} AZN</div>
                              <Button onClick={() => handleAddToCart(product)}>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {language === "az" ? "Səbətə at" : "Add to cart"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </MotionSlideUp>
                ))}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 && (
            <MotionFadeIn className="text-center py-12">
              <div className="space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-semibold">
                  {language === "az" ? "Məhsul tapılmadı" : "No products found"}
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
