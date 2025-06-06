
import { Card, CardContent } from "@/components/ui/card";
import { Waves, TreePine, Fish } from "lucide-react";

const ImpactStats = () => {
  const impactStats = [
    { icon: Waves, label: "Coastline Cleaned", value: "28.5 km", color: "text-blue-600", bgColor: "bg-blue-50", iconBg: "bg-blue-100" },
    { icon: TreePine, label: "Mangroves Restored", value: "4,230", color: "text-green-600", bgColor: "bg-green-50", iconBg: "bg-green-100" },
    { icon: Fish, label: "Marine Life Protected", value: "35k+", color: "text-teal-600", bgColor: "bg-teal-50", iconBg: "bg-teal-100" }
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
