"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, Calendar, DollarSign, Star, TrendingUp, Activity, Clock, AlertCircle } from "lucide-react"
import { MotionFadeIn } from "@/components/common/MotionFadeIn"
import { MotionSlideUp } from "@/components/common/MotionSlideUp"
import { Container } from "@/components/common/Container"

interface DashboardData {
  stats: {
    totalPatients: number
    appointmentsToday: number
    revenue: number
    satisfaction: number
  }
  chart: {
    labels: string[]
    data: number[]
  }
  tableRows: Array<{
    id: number
    patient: string
    service: string
    date: string
    status: string
  }>
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/dashboard.json")
        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Container className="py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </Container>
    )
  }

  if (!dashboardData) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Dashboard məlumatları yüklənə bilmədi</p>
        </div>
      </Container>
    )
  }

  const chartData = dashboardData.chart.labels.map((label, index) => ({
    name: label,
    value: dashboardData.chart.data[index],
  }))

  const pieData = [
    { name: "Kardioloji", value: 35 },
    { name: "Laborator", value: 25 },
    { name: "Radioloji", value: 20 },
    { name: "Digər", value: 20 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Tamamlandı":
        return (
          <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
            Tamamlandı
          </Badge>
        )
      case "Gözləyir":
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Gözləyir
          </Badge>
        )
      case "Ləğv edildi":
        return (
          <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">
            Ləğv edildi
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Container className="py-8 space-y-8">
      <MotionFadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">İdarə Paneli</h1>
            <p className="text-muted-foreground mt-2">AzMedical sistem idarəetməsi</p>
          </div>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            Canlı Məlumatlar
          </Button>
        </div>
      </MotionFadeIn>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MotionSlideUp delay={0.1}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Xəstələr</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.totalPatients.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% keçən aydan
              </p>
            </CardContent>
          </Card>
        </MotionSlideUp>

        <MotionSlideUp delay={0.2}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugünkü Görüşlər</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.appointmentsToday}</div>
              <p className="text-xs text-muted-foreground">
                <Clock className="h-3 w-3 inline mr-1" />5 gözləyir
              </p>
            </CardContent>
          </Card>
        </MotionSlideUp>

        <MotionSlideUp delay={0.3}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aylıq Gəlir</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₼{dashboardData.stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8% keçən aydan
              </p>
            </CardContent>
          </Card>
        </MotionSlideUp>

        <MotionSlideUp delay={0.4}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Məmnunluq</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.stats.satisfaction}/5</div>
              <p className="text-xs text-muted-foreground">
                <Star className="h-3 w-3 inline mr-1 fill-current" />
                Əla reytinq
              </p>
            </CardContent>
          </Card>
        </MotionSlideUp>
      </div>

      {/* Charts and Tables */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Ümumi Baxış</TabsTrigger>
          <TabsTrigger value="appointments">Görüşlər</TabsTrigger>
          <TabsTrigger value="analytics">Analitika</TabsTrigger>
          <TabsTrigger value="reports">Hesabatlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionSlideUp delay={0.1}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Aylıq Xəstə Artımı</CardTitle>
                  <CardDescription>Son 6 ayın statistikası</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </MotionSlideUp>

            <MotionSlideUp delay={0.2}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Xidmət Bölgüsü</CardTitle>
                  <CardDescription>Departmentlər üzrə paylanma</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </MotionSlideUp>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <MotionSlideUp>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Son Görüşlər</CardTitle>
                <CardDescription>Xəstə görüşlərinin siyahısı</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Xəstə</TableHead>
                      <TableHead>Xidmət</TableHead>
                      <TableHead>Tarix</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.tableRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.patient}</TableCell>
                        <TableCell>{row.service}</TableCell>
                        <TableCell>{new Date(row.date).toLocaleDateString("az-AZ")}</TableCell>
                        <TableCell>{getStatusBadge(row.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Bax
                            </Button>
                            <Button variant="outline" size="sm">
                              Redaktə
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </MotionSlideUp>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <MotionSlideUp>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Performans Analitikası</CardTitle>
                <CardDescription>Detallı statistik məlumatlar</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </MotionSlideUp>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <MotionSlideUp>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Hesabat Mərkəzi</CardTitle>
                <CardDescription>Sistem hesabatları və eksportlar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Users className="h-6 w-6 mb-2" />
                    Xəstə Hesabatı
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Calendar className="h-6 w-6 mb-2" />
                    Görüş Hesabatı
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <DollarSign className="h-6 w-6 mb-2" />
                    Maliyyə Hesabatı
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MotionSlideUp>
        </TabsContent>
      </Tabs>
    </Container>
  )
}
