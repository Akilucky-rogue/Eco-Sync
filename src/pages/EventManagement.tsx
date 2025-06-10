
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, QrCode, Bell } from "lucide-react";
import EventCreationForm from "../components/EventCreationForm";
import EventCheckIn from "../components/EventCheckIn";
import EventStatusUpdates from "../components/EventStatusUpdates";

const EventManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock events for demo
  const mockEvents = [
    {
      id: "1",
      title: "Marina Bay Beach Cleanup",
      location: "Marina Bay Beach, Singapore",
      date: "2024-12-15",
      time: "09:00",
      status: 'ongoing' as const,
      points: 50
    },
    {
      id: "2", 
      title: "Mangrove Restoration Workshop",
      location: "East Coast Park",
      date: "2024-12-20",
      time: "14:00", 
      status: 'upcoming' as const,
      points: 75
    }
  ];

  const handleEventCreated = () => {
    setShowCreateForm(false);
    console.log("Event created successfully");
  };

  const handleCheckIn = (eventId: string) => {
    console.log("Checked in to event:", eventId);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#014F86] mb-2">Event Management</h1>
        <p className="text-gray-600">Create, manage, and participate in marine conservation events</p>
      </div>

      {showCreateForm ? (
        <EventCreationForm 
          onEventCreated={handleEventCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : (
        <Tabs defaultValue="participate" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white shadow-lg rounded-xl border-0 p-1 h-14">
              <TabsTrigger 
                value="participate" 
                className="rounded-lg text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#014F86] data-[state=active]:to-[#0066A3] data-[state=active]:text-white"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Check-In
              </TabsTrigger>
              <TabsTrigger 
                value="updates"
                className="rounded-lg text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6F61] data-[state=active]:to-[#E55B50] data-[state=active]:text-white"
              >
                <Bell className="h-4 w-4 mr-2" />
                Updates
              </TabsTrigger>
              <TabsTrigger 
                value="manage"
                className="rounded-lg text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C5E4CF] data-[state=active]:to-[#F6EFD2] data-[state=active]:text-[#014F86]"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Manage
              </TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-[#FF6F61] hover:bg-[#FF6F61]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>

          <TabsContent value="participate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <EventCheckIn
                  key={event.id}
                  event={event}
                  onCheckIn={handleCheckIn}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            {mockEvents.map((event) => (
              <EventStatusUpdates
                key={event.id}
                eventId={event.id}
                eventTitle={event.title}
              />
            ))}
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-[#FF6F61] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#014F86] mb-2">Event Management</h3>
              <p className="text-gray-600 mb-4">Manage your created events and view analytics</p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-[#FF6F61] hover:bg-[#FF6F61]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Event
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EventManagement;
