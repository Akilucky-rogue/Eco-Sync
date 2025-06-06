
import Leaderboard from "../components/Leaderboard";
import WeatherWidget from "../components/WeatherWidget";
import VolunteerTestimonials from "../components/VolunteerTestimonials";
import HeroSection from "../components/HeroSection";
import ImpactStats from "../components/ImpactStats";
import InteractiveMap from "../components/InteractiveMap";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section */}
      <HeroSection />

      <div className="container mx-auto p-4 space-y-8">
        {/* Enhanced Impact Stats */}
        <ImpactStats />

        {/* Weather Widget and Leaderboard Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeatherWidget />
          <Leaderboard />
        </div>

        {/* Enhanced Interactive Map */}
        <InteractiveMap />

        {/* Enhanced Upcoming Events */}
        <UpcomingEvents />

        {/* Volunteer Testimonials */}
        <VolunteerTestimonials />
      </div>
    </div>
  );
};

export default Home;
