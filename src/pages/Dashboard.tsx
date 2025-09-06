import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, TrendingUp, Clock, Plus, Eye } from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      description: "This semester",
      icon: Calendar,
      trend: "+12%",
      color: "text-primary"
    },
    {
      title: "Registrations",
      value: "1,247",
      description: "Total this month",
      icon: Users,
      trend: "+23%",
      color: "text-success"
    },
    {
      title: "Attendance Rate",
      value: "87%",
      description: "Average across events",
      icon: TrendingUp,
      trend: "+5%",
      color: "text-info"
    },
    {
      title: "Upcoming Events",
      value: "8",
      description: "Next 30 days",
      icon: Clock,
      trend: "4 this week",
      color: "text-warning"
    }
  ]

  const upcomingEvents = [
    {
      id: "CS101-001",
      title: "React Workshop",
      date: "March 15, 2024",
      time: "2:00 PM",
      location: "Room 101",
      registrations: 42,
      maxSeats: 50,
      status: "Active"
    },
    {
      id: "CS101-002", 
      title: "AI Seminar",
      date: "March 18, 2024",
      time: "10:00 AM",
      location: "Auditorium A",
      registrations: 89,
      maxSeats: 100,
      status: "Active"
    },
    {
      id: "CS101-003",
      title: "Career Fair",
      date: "March 22, 2024", 
      time: "9:00 AM",
      location: "Main Hall",
      registrations: 156,
      maxSeats: 200,
      status: "Active"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your campus events.</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Upcoming Events</CardTitle>
              <CardDescription>Events scheduled for the next 30 days</CardDescription>
            </div>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {event.id}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {event.registrations}/{event.maxSeats}
                    </div>
                    <div className="text-xs text-muted-foreground">registered</div>
                  </div>
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ width: `${(event.registrations / event.maxSeats) * 100}%` }}
                    />
                  </div>
                  <Badge 
                    variant={event.status === 'Active' ? 'default' : 'secondary'}
                    className="bg-gradient-success"
                  >
                    {event.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}