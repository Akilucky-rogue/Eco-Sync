import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, List, RefreshCw, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface EventLocation {
  id: string;
  name: string;
  location: string;
  coordinates?: [number, number];
  category: string;
  difficulty: string;
  points_reward: number;
  current_volunteers: number;
  max_volunteers: number;
}

// Approximate coordinates for major Indian coastal cities
const CITY_COORDINATES: Record<string, [number, number]> = {
  "Mumbai": [72.8777, 19.0760],
  "Goa": [73.8278, 15.2993],
  "Chennai": [80.2707, 13.0827],
  "Kochi": [76.2673, 9.9312],
  "Visakhapatnam": [83.2185, 17.6868],
  "Pondicherry": [79.8083, 11.9416],
  "Kolkata": [88.3639, 22.5726],
  "Mangalore": [74.8560, 12.9141],
  "Puri": [85.8315, 19.8135],
  "Diu": [70.9870, 20.7144],
  "Kovalam": [76.9797, 8.4004],
  "Andaman": [92.6586, 11.6234],
};

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          console.log('User location:', coords);
        },
        (error) => {
          console.log('Location access denied or unavailable:', error);
        }
      );
    }
  }, []);

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
        (payload) => {
          console.log('Event updated:', payload);
          setLastUpdate(new Date());
          
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const updatedEvent = payload.new as any;
            
            // Extract city and add coordinates
            const cityMatch = Object.keys(CITY_COORDINATES).find(city => 
              updatedEvent.location.includes(city)
            );
            
            if (cityMatch) {
              const eventWithCoords = {
                ...updatedEvent,
                coordinates: CITY_COORDINATES[cityMatch]
              };

              setEvents(prev => {
                const existingIndex = prev.findIndex(e => e.id === updatedEvent.id);
                if (existingIndex >= 0) {
                  // Update existing event
                  const newEvents = [...prev];
                  newEvents[existingIndex] = eventWithCoords;
                  console.log('Updated event in map:', eventWithCoords);
                  return newEvents;
                } else {
                  // Add new event
                  console.log('Added new event to map:', eventWithCoords);
                  return [...prev, eventWithCoords];
                }
              });
            }
          } else if (payload.eventType === 'DELETE') {
            setEvents(prev => prev.filter(e => e.id !== payload.old.id));
            console.log('Removed event from map:', payload.old.id);
          }
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

      if (error) {
        console.error('Error loading events:', error);
        throw error;
      }

      console.log('Loaded events:', data?.length);

      // Extract city names and add coordinates
      const eventsWithCoords = data?.map(event => {
        const cityMatch = Object.keys(CITY_COORDINATES).find(city => 
          event.location.includes(city)
        );
        return {
          ...event,
          coordinates: cityMatch ? CITY_COORDINATES[cityMatch] : undefined
        };
      }).filter(event => event.coordinates) as EventLocation[];

      console.log('Events with coordinates:', eventsWithCoords.length);
      setEvents(eventsWithCoords || []);
    } catch (error: any) {
      console.error('Error loading events:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Store markers in a ref to update them
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

  // Skip Mapbox and go straight to fallback view
  useEffect(() => {
    if (events.length === 0) {
      console.log('Waiting for events to load...');
      return;
    }

    console.log('Displaying events in static map view with', events.length, 'events');
    setLoading(false);
    setShowFallback(true);
  }, [events]);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current.clear();
      userMarkerRef.current?.remove();
      map.current?.remove();
    };
  }, []);

  const retryMapLoad = () => {
    setError(null);
    setShowFallback(false);
    setLoading(true);
    loadEvents();
  };

  return (
    <Card className="overflow-hidden shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-[#014F86] to-[#0066A3] text-white">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-white/20 rounded-lg">
            <MapPin className="h-6 w-6" />
          </div>
          Coastal Cleanup Locations
          <div className="flex gap-2 ml-auto">
            <Badge className="bg-white/20 text-white border-white/30 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Updates
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
        <div className="h-96 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-teal-100">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#014F86] mx-auto mb-2" />
                <p className="text-sm text-gray-600">Loading map...</p>
              </div>
            </div>
          ) : showFallback || error ? (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-teal-100 overflow-y-auto">
              <div className="p-6">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border mb-4 text-center">
                  <MapPin className="h-8 w-8 text-[#014F86] mx-auto mb-2" />
                  <p className="text-[#014F86] font-semibold mb-1">Map unavailable</p>
                  <p className="text-xs text-gray-600 mb-3">{error || "Unable to load interactive map"}</p>
                  <Button onClick={retryMapLoad} variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Retry Map
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-[#014F86] font-semibold mb-2">
                    <List className="h-4 w-4" />
                    Upcoming Events ({events.length})
                  </div>
                  {events.map(event => (
                    <div key={event.id} className="bg-white rounded-lg p-4 shadow border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-[#014F86] text-sm">{event.name}</h4>
                        <Badge className="bg-[#FF6F61] text-white text-xs">{event.points_reward} pts</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                        <Navigation className="h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">{event.category}</Badge>
                        <Badge variant="outline" className="text-xs">{event.difficulty}</Badge>
                        <span className="text-xs text-gray-600">
                          {event.current_volunteers}/{event.max_volunteers} volunteers
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div ref={mapContainer} className="absolute inset-0" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
