
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award } from "lucide-react";

const InteractiveMap = () => {
  return (
    <Card className="overflow-hidden shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-[#014F86] to-[#0066A3] text-white">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-white/20 rounded-lg">
            <MapPin className="h-6 w-6" />
          </div>
          Coastal Cleanup Locations
          <Badge className="bg-white/20 text-white border-white/30">Live Updates</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 bg-gradient-to-br from-blue-50 via-blue-100 to-teal-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          {/* Enhanced Map Pins */}
          <div className="absolute top-1/4 left-1/3 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <div className="font-semibold text-[#014F86]">Mumbai</div>
                <div className="text-sm text-gray-600">4 Active Events</div>
              </div>
            </div>
            <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Mumbai</div>
          </div>
          
          <div className="absolute top-1/2 left-1/4 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <div className="font-semibold text-[#014F86]">Goa</div>
                <div className="text-sm text-gray-600">3 Active Events</div>
              </div>
            </div>
            <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Goa</div>
          </div>
          
          <div className="absolute top-1/3 right-1/4 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <div className="font-semibold text-[#014F86]">Chennai</div>
                <div className="text-sm text-gray-600">2 Active Events</div>
              </div>
            </div>
            <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Chennai</div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-full flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <div className="font-semibold text-[#014F86]">Kochi</div>
                <div className="text-sm text-gray-600">1 Active Event</div>
              </div>
            </div>
            <div className="text-xs text-center mt-2 font-medium bg-white/80 px-2 py-1 rounded-full">Kochi</div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Award className="h-6 w-6 text-[#FF6F61]" />
                <p className="text-[#014F86] font-bold text-lg">Interactive Map</p>
              </div>
              <p className="text-sm text-gray-600">Click on pins to view cleanup details</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
