
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, TreePine, Fish } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ImpactStats = () => {
  const [stats, setStats] = useState({
    coastlineCleaned: 0,
    volunteersCount: 0,
    wasteCollected: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get total waste collected from cleanups
      const { data: cleanupData } = await supabase
        .from('cleanups')
        .select('waste_collected');
      
      const totalWaste = cleanupData?.reduce((sum, cleanup) => 
        sum + Number(cleanup.waste_collected), 0) || 0;

      // Get total volunteers
      const { count: volunteersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Calculate coastline cleaned (estimate: 100kg per km)
      const coastline = totalWaste / 100;

      setStats({
        coastlineCleaned: coastline,
        volunteersCount: volunteersCount || 0,
        wasteCollected: totalWaste
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const impactStats = [
    { 
      icon: Waves, 
      label: "Coastline Cleaned", 
      value: `${stats.coastlineCleaned.toFixed(1)} km`, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50", 
      iconBg: "bg-blue-100" 
    },
    { 
      icon: TreePine, 
      label: "Active Volunteers", 
      value: stats.volunteersCount.toString(), 
      color: "text-green-600", 
      bgColor: "bg-green-50", 
      iconBg: "bg-green-100" 
    },
    { 
      icon: Fish, 
      label: "Waste Collected", 
      value: `${stats.wasteCollected.toFixed(0)}kg`, 
      color: "text-teal-600", 
      bgColor: "bg-teal-50", 
      iconBg: "bg-teal-100" 
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {impactStats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
          <CardContent className="p-6 text-center">
            <div className={`w-16 h-16 ${stat.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner`}>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImpactStats;
