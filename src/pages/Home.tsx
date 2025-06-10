
import Leaderboard from "../components/Leaderboard";
import WeatherWidget from "../components/WeatherWidget";
import VolunteerTestimonials from "../components/VolunteerTestimonials";
import HeroSection from "../components/HeroSection";
import ImpactStats from "../components/ImpactStats";
import InteractiveMap from "../components/InteractiveMap";
import UpcomingEvents from "../components/UpcomingEvents";
import EnvironmentalQuiz from "../components/EnvironmentalQuiz";

const Home = () => {
  const handleQuizComplete = (score: number, totalQuestions: number) => {
    console.log(`Quiz completed with score: ${score}/${totalQuestions}`);
  };

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

        {/* Educational Quiz Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#014F86] mb-2">Test Your Knowledge</h2>
            <p className="text-gray-600">Learn about marine conservation while having fun!</p>
          </div>
          <EnvironmentalQuiz 
            topic="Marine Conservation"
            onComplete={handleQuizComplete}
          />
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
