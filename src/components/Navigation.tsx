
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, Calendar, User, BarChart3, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/events", icon: Calendar, label: "Events" },
    { path: "/social", icon: Users, label: "Community" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/dashboard", icon: BarChart3, label: "Impact" },
    { path: "/admin", icon: Settings, label: "Admin" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-3 z-50 md:hidden shadow-xl">
      <NavigationMenu className="w-full max-w-none">
        <NavigationMenuList className="flex justify-around w-full space-x-0">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              <Link to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-3 px-4 transition-all duration-300 rounded-xl ${
                    location.pathname === item.path
                      ? "text-[#014F86] bg-gradient-to-br from-[#C5E4CF]/30 to-[#F6EFD2]/30 shadow-lg border border-[#C5E4CF]/50 transform scale-105"
                      : "text-gray-600 hover:text-[#014F86] hover:bg-gray-100/50"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path 
                      ? "bg-gradient-to-br from-[#FF6F61] to-[#E55B50] shadow-md" 
                      : "bg-transparent"
                  }`}>
                    <item.icon className={`h-5 w-5 ${
                      location.pathname === item.path ? "text-white" : ""
                    }`} />
                  </div>
                  <span className={`text-xs font-medium ${
                    location.pathname === item.path ? "font-semibold" : ""
                  }`}>
                    {item.label}
                  </span>
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FF6F61] rounded-full"></div>
                  )}
                </Button>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
