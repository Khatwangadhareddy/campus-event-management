import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin, Users, Save, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function CreateEvent() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    time: "",
    location: "",
    maxSeats: "",
    collegeId: "CS101" // Default college ID
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.type || !date || !formData.time || !formData.location || !formData.maxSeats) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    // Generate event ID
    const eventId = `${formData.collegeId}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    
    const eventData = {
      ...formData,
      event_id: eventId,
      date: format(date, "yyyy-MM-dd"),
      maxSeats: parseInt(formData.maxSeats),
      status: "active"
    }

    console.log("Event Data:", eventData)
    
    toast({
      title: "Event Created Successfully!",
      description: `Event ID: ${eventId} has been created.`,
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      type: "",
      time: "",
      location: "",
      maxSeats: "",
      collegeId: "CS101"
    })
    setDate(undefined)
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details to create a new campus event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Event Information
                </CardTitle>
                <CardDescription>
                  Basic details about your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., React Workshop"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this event is about..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Seminar">Seminar</SelectItem>
                        <SelectItem value="Conference">Conference</SelectItem>
                        <SelectItem value="Career Fair">Career Fair</SelectItem>
                        <SelectItem value="Social">Social Event</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College</Label>
                    <Select value={formData.collegeId} onValueChange={(value) => handleInputChange("collegeId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select college" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="CS101">Computer Science</SelectItem>
                        <SelectItem value="ENG01">Engineering</SelectItem>
                        <SelectItem value="BUS01">Business</SelectItem>
                        <SelectItem value="ART01">Arts & Sciences</SelectItem>
                        <SelectItem value="MED01">Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date, Time & Location */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Schedule & Location
                </CardTitle>
                <CardDescription>
                  When and where the event will take place
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Event Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Event Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Room 101, Auditorium A"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Capacity */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Capacity
                </CardTitle>
                <CardDescription>
                  Set the maximum number of attendees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="maxSeats">Maximum Seats *</Label>
                  <Input
                    id="maxSeats"
                    type="number"
                    placeholder="e.g., 50"
                    min="1"
                    max="1000"
                    value={formData.maxSeats}
                    onChange={(e) => handleInputChange("maxSeats", e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the maximum number of people that can attend this event
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-border/50 bg-muted/20">
              <CardHeader>
                <CardTitle className="text-sm">Event Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><strong>Title:</strong> {formData.title || "Not set"}</div>
                <div><strong>Type:</strong> {formData.type || "Not set"}</div>
                <div><strong>Date:</strong> {date ? format(date, "PPP") : "Not set"}</div>
                <div><strong>Time:</strong> {formData.time || "Not set"}</div>
                <div><strong>Location:</strong> {formData.location || "Not set"}</div>
                <div><strong>Capacity:</strong> {formData.maxSeats || "Not set"}</div>
                <div><strong>College:</strong> {formData.collegeId}</div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                <Save className="mr-2 h-4 w-4" />
                Create Event
              </Button>
              <Button variant="outline" className="w-full" type="button">
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}