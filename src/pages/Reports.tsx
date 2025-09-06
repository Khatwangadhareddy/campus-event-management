import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BarChart, 
  PieChart, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Filter,
  Star,
  Award,
  Target
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function Reports() {
  const eventPopularity = [
    { name: "React Workshop", registrations: 142, capacity: 150, rate: 94.7 },
    { name: "AI Seminar", registrations: 89, capacity: 100, rate: 89.0 },
    { name: "Career Fair", registrations: 156, capacity: 200, rate: 78.0 },
    { name: "Python Bootcamp", registrations: 28, capacity: 30, rate: 93.3 },
    { name: "Data Science Talk", registrations: 67, capacity: 80, rate: 83.8 }
  ]

  const attendanceData = [
    { event: "React Workshop", registered: 142, attended: 128, rate: 90.1 },
    { event: "AI Seminar", registered: 89, attended: 76, rate: 85.4 },
    { event: "Career Fair", registered: 156, attended: 134, rate: 85.9 },
    { event: "Python Bootcamp", registered: 28, attended: 26, rate: 92.9 },
    { event: "Data Science Talk", registered: 67, attended: 58, rate: 86.6 }
  ]

  const topStudents = [
    { id: "STU001", name: "Alice Johnson", eventsAttended: 8, lastEvent: "React Workshop" },
    { id: "STU002", name: "Bob Smith", eventsAttended: 7, lastEvent: "AI Seminar" },
    { id: "STU003", name: "Carol Davis", eventsAttended: 6, lastEvent: "Career Fair" }
  ]

  const feedbackSummary = [
    { event: "React Workshop", avgRating: 4.8, totalFeedback: 95 },
    { event: "AI Seminar", avgRating: 4.6, totalFeedback: 62 },
    { event: "Career Fair", avgRating: 4.4, totalFeedback: 89 },
    { event: "Python Bootcamp", avgRating: 4.9, totalFeedback: 24 },
    { event: "Data Science Talk", avgRating: 4.3, totalFeedback: 41 }
  ]

  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-success"
    if (rate >= 80) return "text-warning"
    return "text-destructive"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Insights into your campus events performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="semester">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +20% from last semester
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last semester
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +15% from last semester
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last semester
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Event Popularity Report */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Event Popularity
            </CardTitle>
            <CardDescription>Registration rates by event</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventPopularity.map((event, index) => (
                <div key={event.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{event.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {event.registrations}/{event.capacity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={event.rate} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-12">
                      {event.rate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Analysis */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Attendance Analysis
            </CardTitle>
            <CardDescription>Attendance vs registration comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((event) => (
                <div key={event.event} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{event.event}</span>
                    <span className={`text-sm font-medium ${getAttendanceColor(event.rate)}`}>
                      {event.rate}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Registered: {event.registered}</span>
                    <span>Attended: {event.attended}</span>
                    <span>No-shows: {event.registered - event.attended}</span>
                  </div>
                  <Progress value={event.rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Most Active Students
            </CardTitle>
            <CardDescription>Students with highest event participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-gradient-primary text-white' :
                      index === 1 ? 'bg-gradient-success text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ID: {student.id}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{student.eventsAttended} events</div>
                    <div className="text-xs text-muted-foreground">
                      Last: {student.lastEvent}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Summary */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Feedback Summary
            </CardTitle>
            <CardDescription>Average ratings and feedback counts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackSummary.map((event) => (
                <div key={event.event} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.totalFeedback} responses
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-warning text-sm">
                        {getRatingStars(event.avgRating)}
                      </span>
                      <span className="font-medium">{event.avgRating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      avg rating
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}