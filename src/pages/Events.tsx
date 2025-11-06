import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy } from "lucide-react";
import EventCard from "../components/EventCard";
import PastEventCard from "../components/PastEventCard";
import EventsHeader from "../components/EventsHeader";
import ErrorBoundary from "../components/ErrorBoundary";
import PageLoader from "../components/PageLoader";
import ErrorMessage from "../components/ErrorMessage";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  current_volunteers: number;
  max_volunteers: number;
  points_reward: number;
  category: string;
  difficulty: string;
  waste_target: string[];
  status: string;
  image: string;
}

const Events = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      loadEvents();
      loadJoinedEvents();
    }
  }, [user]);

  // Realtime subscription for events
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('events-changes')
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
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'event_participants'
        },
        () => {
          loadJoinedEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load upcoming events
      const { data: upcoming, error: upcomingError } = await supabase
        .from('events')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (upcomingError) throw upcomingError;

      // Load past events with participant count
      const { data: past, error: pastError } = await supabase
        .from('events')
        .select(`
          *,
          event_participants(count)
        `)
        .eq('status', 'completed')
        .order('date', { ascending: false })
        .limit(10);

      if (pastError) throw pastError;

      setUpcomingEvents(upcoming || []);
      setPastEvents(past?.map(event => ({
        id: event.id,
        name: event.name,
        date: new Date(event.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        wasteCollected: '0 kg', // This should come from cleanup records
        volunteers: event.current_volunteers,
        pointsEarned: event.points_reward,
        status: event.status,
        image: event.image || '🏖️'
      })) || []);
    } catch (error: any) {
      console.error('Error loading events:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadJoinedEvents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('event_participants')
        .select('event_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setJoinedEvents(data?.map(p => p.event_id) || []);
    } catch (error) {
      console.error('Error loading joined events:', error);
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('event_participants')
        .insert({
          event_id: eventId,
          user_id: user.id
        });

      if (error) throw error;

      // Update volunteer count
      const event = upcomingEvents.find(e => e.id === eventId);
      if (event) {
        await supabase
          .from('events')
          .update({ current_volunteers: event.current_volunteers + 1 })
          .eq('id', eventId);
      }

      setJoinedEvents(prev => [...prev, eventId]);
    } catch (error: any) {
      console.error('Error joining event:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto p-4">
        <PageLoader text="Loading events..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage 
          title="Failed to load events"
          message={error}
          onRetry={loadEvents}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <EventsHeader />

        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-xl border-0 p-1 h-14">
            <TabsTrigger 
              value="upcoming" 
              className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6F61] data-[state=active]:to-[#E55B50] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#014F86] data-[state=active]:to-[#0066A3] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No upcoming events</h3>
                <p className="text-gray-500">Check back soon for new cleanup events!</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    id: event.id,
                    name: event.name,
                    date: new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    }),
                    time: event.time,
                    location: event.location,
                    description: event.description,
                    volunteers: event.current_volunteers,
                    maxVolunteers: event.max_volunteers,
                    pointsReward: event.points_reward,
                    category: event.category,
                    difficulty: event.difficulty,
                    wasteTarget: event.waste_target,
                    status: event.status,
                    image: event.image || '🏖️'
                  }}
                  isJoined={joinedEvents.includes(event.id)}
                  onJoin={() => handleJoinEvent(event.id)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastEvents.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No past events</h3>
                <p className="text-gray-500">Your completed events will appear here.</p>
              </div>
            ) : (
              pastEvents.map((event) => (
                <PastEventCard key={event.id} event={event} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default Events;
