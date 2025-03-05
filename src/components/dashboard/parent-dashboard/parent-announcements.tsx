import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search, 
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ParentAnnouncements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Mock data for announcements (would be fetched from API in a real app)
  const [announcementsData, setAnnouncementsData] = useState([
    {
      id: 1,
      title: "School Closure - Weather Advisory",
      content: "Due to the severe weather warning, the school will remain closed tomorrow. All classes will be conducted online. Please check your email for further instructions.",
      priority: "urgent",
      date: "May 18, 2025",
      time: "2:30 PM",
      author: "David Brown"
    },
    {
      id: 2,
      title: "Annual Sports Day - Schedule Change",
      content: "The Annual Sports Day has been rescheduled to June 15th due to venue availability. All previously arranged activities will proceed as planned.",
      priority: "general",
      date: "May 15, 2025",
      time: "10:15 AM",
      author: "David Brown"
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      content: "The quarterly parent-teacher conferences will be held on June 5th and 6th. Please sign up for a time slot through the parent portal.",
      priority: "general",
      date: "May 8, 2025",
      time: "4:45 PM",
      author: "David Brown"
    },
    {
      id: 5,
      title: "End of Year Ceremony",
      content: "The end of year ceremony will be held on June 20th at 10:00 AM in the school auditorium. All students and parents are invited to attend.",
      priority: "general",
      date: "May 5, 2025",
      time: "4:45 PM",
      author: "David Brown"
    }
  ]);

  // Filter announcements based on search query and priority
  const filteredAnnouncements = announcementsData.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === "all" || announcement.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });

  // Pagination
  const announcementsPerPage = 5;
  const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * announcementsPerPage,
    currentPage * announcementsPerPage
  );

  // Get priority badge for announcement
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500">Urgent</Badge>;
      default:
        return <Badge className="bg-green-500">General</Badge>;
    }
  };

  // Handle announcement click
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>School Announcements</CardTitle>
          <CardDescription>
            Important announcements from the school administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3">
              <div className="mb-4">
                <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search announcements..." 
                      className="pl-8 w-full" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select 
                    value={filterPriority} 
                    onValueChange={setFilterPriority}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                {paginatedAnnouncements.length > 0 ? (
                  <div className="divide-y">
                    {paginatedAnnouncements.map((announcement) => (
                      <div 
                        key={announcement.id}
                        className={`p-3 cursor-pointer hover:bg-muted ${
                          selectedAnnouncement?.id === announcement.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => handleAnnouncementClick(announcement)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{announcement.title}</h4>
                          {getPriorityBadge(announcement.priority)}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {announcement.content}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          {announcement.date}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No announcements found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery || filterPriority !== "all" ? 
                        "No announcements match your search criteria" : 
                        "There are no announcements at this time"}
                    </p>
                  </div>
                )}
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3">
              {selectedAnnouncement ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{selectedAnnouncement.title}</CardTitle>
                          {getPriorityBadge(selectedAnnouncement.priority)}
                        </div>
                        <CardDescription>
                          Posted on {selectedAnnouncement.date} at {selectedAnnouncement.time}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{selectedAnnouncement.content}</p>
                    </div>
                    <div className="mt-6 text-sm text-muted-foreground">
                      From: {selectedAnnouncement.author}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-64 border rounded-lg">
                  <div className="text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Select an announcement</h3>
                    <p className="text-muted-foreground">
                      Choose an announcement from the list to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}