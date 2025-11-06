
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'upcoming')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(3);

      if (error) throw error;
      setUpcomingEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beach': return '🏖️';
      case 'coastal': return '🌊';
      case 'river': return '🏞️';
      case 'marine': return '🐠';
      default: return '🌍';
    }
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2]">
          <CardTitle className="text-[#014F86]">Loading Events...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (upcomingEvents.length === 0) {
    return (
      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2]">
          <CardTitle className="text-[#014F86]">No Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">Check back soon for new cleanup events!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2]">
        <CardTitle className="text-[#014F86] flex items-center gap-3 text-xl">
          <div className="p-2 bg-[#014F86]/10 rounded-lg">
            <Calendar className="h-6 w-6" />
          </div>
          Upcoming Cleanups
          <Badge className="bg-[#FF6F61] text-white">Hot Events</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF6F61] to-[#E55B50]"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{getCategoryIcon(event.category)}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-[#014F86] text-lg group-hover:text-[#0066A3] transition-colors">{event.name}</h4>
                        <Badge className={`${getDifficultyColor(event.difficulty)} border font-medium`}>
                          {event.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
                        </span>
                        <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                          <MapPin className="h-4 w-4 text-green-600" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                          <Users className="h-4 w-4 text-purple-600" />
                          {event.current_volunteers}/{event.max_volunteers}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/events`}>
                    <Button className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] hover:from-[#E55B50] hover:to-[#D14E41] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Award className="h-4 w-4 mr-2" />
                      Join Cleanup
                    </Button>
                  </Link>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Volunteer Progress</span>
                    <span>{Math.round((event.current_volunteers / event.max_volunteers) * 100)}% Full</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#FF6F61] to-[#E55B50] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(event.current_volunteers / event.max_volunteers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
