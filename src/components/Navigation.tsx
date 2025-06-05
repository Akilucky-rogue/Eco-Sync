
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, Calendar, User, BarChart3, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/events", icon: Calendar, label: "Events" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/dashboard", icon: BarChart3, label: "Impact" },
    { path: "/admin", icon: Settings, label: "Admin" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <NavigationMenu className="w-full max-w-none">
        <NavigationMenuList className="flex justify-around w-full space-x-0">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              <Link to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                    location.pathname === item.path
                      ? "text-[#014F86] bg-[#C5E4CF]/20"
                      : "text-gray-600"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
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
