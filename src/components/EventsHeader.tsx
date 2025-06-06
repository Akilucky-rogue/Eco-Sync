
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const EventsHeader = () => {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-xl shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <Badge className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2] text-[#014F86] border-0 px-4 py-2 text-sm font-semibold">
          🌊 Coastal Conservation Events
        </Badge>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#014F86] mb-3 bg-gradient-to-r from-[#014F86] to-[#0066A3] bg-clip-text text-transparent">
        Coastal Cleanup Events
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Discover and join cleanup events across India's coastline to make a positive environmental impact
      </p>
    </div>
  );
};

export default EventsHeader;
