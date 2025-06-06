
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye } from "lucide-react";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  recommendation: string;
  icon: string;
}

const WeatherWidget = () => {
  const weatherData: WeatherData[] = [
    {
      city: "Mumbai",
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 75,
      windSpeed: 12,
      visibility: 8,
      recommendation: "Good for cleanup",
      icon: "⛅"
    },
    {
      city: "Goa",
      temperature: 32,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 8,
      visibility: 10,
      recommendation: "Excellent conditions",
      icon: "☀️"
    },
    {
      city: "Chennai",
      temperature: 26,
      condition: "Light Rain",
      humidity: 85,
      windSpeed: 15,
      visibility: 6,
      recommendation: "Postpone if possible",
      icon: "🌦️"
    }
  ];

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes("Excellent")) return "bg-green-100 text-green-800 border-green-200";
    if (recommendation.includes("Good")) return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-orange-100 text-orange-800 border-orange-200";
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Cloud className="h-5 w-5" />
          </div>
          Weather Conditions
          <Badge className="bg-white/20 text-white border-white/30">Live Updates</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {weatherData.map((weather, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{weather.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#014F86]">{weather.city}</h4>
                    <p className="text-sm text-gray-600">{weather.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#014F86]">{weather.temperature}°C</div>
                  <Badge className={`${getRecommendationColor(weather.recommendation)} border text-xs mt-1`}>
                    {weather.recommendation}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-sm font-semibold">{weather.humidity}%</div>
                    <div className="text-xs text-gray-600">Humidity</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                  <Wind className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-semibold">{weather.windSpeed} km/h</div>
                    <div className="text-xs text-gray-600">Wind</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <div>
                    <div className="text-sm font-semibold">{weather.visibility} km</div>
                    <div className="text-xs text-gray-600">Visibility</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700 text-center">
            💡 <strong>Pro Tip:</strong> Best cleanup conditions are sunny weather with low wind speeds and good visibility!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
