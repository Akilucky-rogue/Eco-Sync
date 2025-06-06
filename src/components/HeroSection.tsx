
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#014F86] via-[#0066A3] to-[#C5E4CF] text-white p-8 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      <div className="relative container mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Sparkles className="h-6 w-6" />
          </div>
          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
            🌊 Marine Conservation Platform
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Welcome to EcoSync India
        </h1>
        <p className="text-xl opacity-90 mb-6 max-w-2xl">
          Join our community in protecting India's marine ecosystems and coastal heritage through collaborative cleanup efforts
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/events">
            <Button size="lg" className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Calendar className="h-5 w-5 mr-2" />
              Explore Events
            </Button>
          </Link>
          <Link to="/profile">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg">
              <Star className="h-5 w-5 mr-2" />
              Take Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
