import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, QrCode, Bell } from "lucide-react";
import EventCreationForm from "../components/EventCreationForm";
import EventCheckIn from "../components/EventCheckIn";
import EventStatusUpdates from "../components/EventStatusUpdates";
import ErrorBoundary from "../components/ErrorBoundary";
import PageLoader from "../components/PageLoader";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  status: string;
  points_reward: number;
}

const EventManagement = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  // Realtime subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('event-management-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        () => {
          loadEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(10);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventCreated = async (eventData: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('events')
        .insert({
          name: eventData.title,
          description: eventData.description,
          location: eventData.location,
          date: eventData.date,
          time: eventData.time,
          category: eventData.category,
          difficulty: eventData.difficulty || 'beginner',
          max_volunteers: eventData.maxParticipants === 'unlimited' ? 999 : parseInt(eventData.maxParticipants),
          points_reward: 100,
          status: 'upcoming',
          created_by: user.id,
          waste_target: []
        });

      if (error) throw error;

      setShowCreateForm(false);
      toast.success("Event created successfully!");
      loadEvents();
    } catch (error: any) {
      toast.error(error.message || "Failed to create event");
    }
  };

  const handleCheckIn = async (eventId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('event_participants')
        .update({ 
          checked_in: true,
          checked_in_at: new Date().toISOString()
        })
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success("Successfully checked in to event!");
    } catch (error: any) {
      toast.error(error.message || "Failed to check in");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto p-4">
        <PageLoader text="Loading event management..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No events to check in</h3>
                  <p className="text-gray-500">Join an event to check in!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <EventCheckIn
                      key={event.id}
                      event={{
                        id: event.id,
                        title: event.name,
                        location: event.location,
                        date: event.date,
                        time: event.time,
                        status: event.status as 'upcoming' | 'ongoing' | 'completed',
                        points: event.points_reward
                      }}
                      onCheckIn={handleCheckIn}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No event updates</h3>
                  <p className="text-gray-500">Updates will appear here!</p>
                </div>
              ) : (
                events.map((event) => (
                  <EventStatusUpdates
                    key={event.id}
                    eventId={event.id}
                    eventTitle={event.name}
                  />
                ))
              )}
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
    </ErrorBoundary>
  );
};

export default EventManagement;
