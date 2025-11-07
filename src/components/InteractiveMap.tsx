import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import indiaMap from "@/assets/india-states-map.png";

interface EventLocation {
  id: string;
  name: string;
  location: string;
  coordinates?: { x: number; y: number };
  category: string;
  difficulty: string;
  points_reward: number;
  current_volunteers: number;
  max_volunteers: number;
}

// Approximate pixel positions for coastal cities on the India states map
const CITY_POSITIONS: Record<string, { x: number; y: number }> = {
  // West Coast
  "Mumbai": { x: 26, y: 54 },
  "Goa": { x: 24, y: 62 },
  "Mangalore": { x: 25, y: 68 },
  "Kochi": { x: 26, y: 76 },
  "Kovalam": { x: 27, y: 82 },
  "Diu": { x: 20, y: 48 },
  
  // East Coast
  "Chennai": { x: 52, y: 70 },
  "Pondicherry": { x: 53, y: 72 },
  "Visakhapatnam": { x: 58, y: 58 },
  "Puri": { x: 60, y: 54 },
  "Kolkata": { x: 62, y: 50 },
  "Digha": { x: 63, y: 52 },
  
  // Islands
  "Andaman": { x: 75, y: 72 },
  "Port Blair": { x: 75, y: 72 },
  
  // Additional coastal cities
  "Surat": { x: 22, y: 50 },
  "Thiruvananthapuram": { x: 27, y: 82 }
};

const InteractiveMap = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();

    // Subscribe to real-time updates for events
    const channel = supabase
      .channel('events-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: 'status=eq.upcoming'
        },
        () => {
          setLastUpdate(new Date());
          loadEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, name, location, category, difficulty, points_reward, current_volunteers, max_volunteers')
        .eq('status', 'upcoming')
        .limit(20);

      if (error) throw error;

      // Extract city names and add positions
      const eventsWithPositions = data?.map(event => {
        const cityMatch = Object.keys(CITY_POSITIONS).find(city => 
          event.location.includes(city)
        );
        return {
          ...event,
          coordinates: cityMatch ? CITY_POSITIONS[cityMatch] : undefined
        };
      }).filter(event => event.coordinates);

      setEvents(eventsWithPositions || []);
      setLoading(false);
    } catch (error: any) {
      console.error('Error loading events:', error);
      setLoading(false);
    }
  };

  // Skip Mapbox and go straight to custom map view
  useEffect(() => {
    if (events.length === 0) {
      return;
    }
    setLoading(false);
  }, [events]);

  // Group events by city
  const eventsByCity = events.reduce((acc, event) => {
    const city = Object.keys(CITY_POSITIONS).find(c => event.location.includes(c)) || 'Other';
    if (!acc[city]) acc[city] = [];
    acc[city].push(event);
    return acc;
  }, {} as Record<string, EventLocation[]>);

  if (loading) {
    return (
      <Card className="overflow-hidden shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-[#014F86] to-[#0066A3] text-white">
          <CardTitle className="flex items-center gap-3 text-xl">
            <MapPin className="h-6 w-6" />
            Loading Events Map...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014F86] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading event locations...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-[#014F86] to-[#0066A3] text-white">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-white/20 rounded-lg">
            <MapPin className="h-6 w-6" />
          </div>
          India Cleanup Events Map
          <div className="flex gap-2 ml-auto">
            <Badge className="bg-white/20 text-white border-white/30 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {events.length} Active Events
            </Badge>
            {lastUpdate && (
              <Badge variant="outline" className="bg-white/10 text-white border-white/30 text-xs">
                Updated {new Date(lastUpdate).toLocaleTimeString()}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[600px] relative bg-gradient-to-br from-blue-50 to-teal-50">
          {/* Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: `url(${indiaMap})` }}
          />
          
          {/* Event Markers */}
          {Object.entries(eventsByCity).map(([city, cityEvents]) => {
            const position = CITY_POSITIONS[city];
            if (!position) return null;

            return (
              <div
                key={city}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ 
                  left: `${position.x}%`, 
                  top: `${position.y}%`,
                  zIndex: selectedCity === city ? 20 : 10
                }}
                onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              >
                {/* Marker Pin */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                    {cityEvents.length}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#E55B50]"></div>
                </div>

                {/* Popup on click */}
                {selectedCity === city && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-2xl border-2 border-[#014F86] p-4 z-30">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-[#014F86] text-lg">{city}</h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCity(null);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{cityEvents.length} event{cityEvents.length > 1 ? 's' : ''}</p>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {cityEvents.map(event => (
                        <div key={event.id} className="p-3 bg-gray-50 rounded-lg border">
                          <h4 className="font-semibold text-sm text-[#014F86] mb-2">{event.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                            <Navigation className="h-3 w-3" />
                            {event.location}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">{event.category}</Badge>
                            <Badge variant="outline" className="text-xs">{event.difficulty}</Badge>
                            <Badge className="bg-[#FF6F61] text-white text-xs">{event.points_reward} pts</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            {event.current_volunteers}/{event.max_volunteers} volunteers
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
            <h4 className="font-semibold text-[#014F86] mb-2 text-sm">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">3</div>
                <span className="text-xs text-gray-700">Event locations (click to view)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
