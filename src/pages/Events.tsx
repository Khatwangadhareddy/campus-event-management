import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Filter, 
  Plus, 
  Search,
  Edit,
  Trash2,
  Eye
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Events() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const events = [
    {
      id: "CS101-001",
      title: "React Workshop",
      description: "Learn the fundamentals of React development",
      type: "Workshop",
      date: "2024-03-15",
      time: "14:00",
      location: "Room 101",
      maxSeats: 50,
      registrations: 42,
      status: "Active",
      createdBy: "Prof. Smith"
    },
    {
      id: "CS101-002",
      title: "AI & Machine Learning Seminar", 
      description: "Introduction to AI and ML concepts",
      type: "Seminar",
      date: "2024-03-18",
      time: "10:00", 
      location: "Auditorium A",
      maxSeats: 100,
      registrations: 89,
      status: "Active",
      createdBy: "Dr. Johnson"
    },
    {
      id: "CS101-003",
      title: "Spring Career Fair",
      description: "Meet with top tech companies",
      type: "Career Fair",
      date: "2024-03-22",
      time: "09:00",
      location: "Main Hall", 
      maxSeats: 200,
      registrations: 156,
      status: "Active",
      createdBy: "Career Office"
    },
    {
      id: "CS101-004",
      title: "Python Bootcamp",
      description: "Intensive Python programming course",
      type: "Workshop", 
      date: "2024-03-12",
      time: "13:00",
      location: "Lab 205",
      maxSeats: 30,
      registrations: 28,
      status: "Completed",
      createdBy: "Prof. Davis"
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || event.type.toLowerCase() === typeFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-gradient-success">Active</Badge>
      case "Completed":
        return <Badge variant="secondary">Completed</Badge>
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCapacityColor = (registrations: number, maxSeats: number) => {
    const percentage = (registrations / maxSeats) * 100
    if (percentage >= 90) return "bg-destructive"
    if (percentage >= 70) return "bg-warning"
    return "bg-gradient-primary"
  }

  const handleCreateEvent = () => {
    navigate("/create-event")
  }

  const handleViewEvent = (eventId: string) => {
    toast({
      title: "View Event",
      description: `Opening details for event ${eventId}`,
    })
    // Navigate to event details page when implemented
  }

  const handleEditEvent = (eventId: string) => {
    toast({
      title: "Edit Event",
      description: `Opening editor for event ${eventId}`,
    })
    // Navigate to edit event page when implemented
  }

  const handleDeleteEvent = (eventId: string) => {
    toast({
      title: "Delete Event",
      description: `Event ${eventId} has been deleted`,
      variant: "destructive",
    })
    // Implement delete functionality when backend is connected
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage all campus events</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90" onClick={handleCreateEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="career fair">Career Fair</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="border-border/50 hover:shadow-lg transition-all duration-200 hover:border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {event.id}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </div>
                {getStatusBadge(event.status)}
              </div>
              <CardDescription className="text-sm">
                {event.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Event Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Created by {event.createdBy}</span>
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Registrations</span>
                  <span className="font-medium">
                    {event.registrations}/{event.maxSeats}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getCapacityColor(event.registrations, event.maxSeats)}`}
                    style={{ width: `${Math.min((event.registrations / event.maxSeats) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((event.registrations / event.maxSeats) * 100)}% capacity
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewEvent(event.id)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditEvent(event.id)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-2"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground text-center mb-4">
              No events match your current filters. Try adjusting your search criteria.
            </p>
            <Button className="bg-gradient-primary hover:opacity-90" onClick={handleCreateEvent}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Event
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}