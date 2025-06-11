
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/events", icon: Calendar, label: "Events" },
    { path: "/social", icon: Users, label: "Social" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border px-2 py-2 z-50 md:hidden shadow-xl">
      <NavigationMenu className="w-full max-w-none">
        <NavigationMenuList className="flex justify-between w-full gap-1">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.path} className="flex-1">
              <Link to={item.path} className="w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-1 transition-all duration-300 rounded-lg w-full min-w-0 ${
                    location.pathname === item.path
                      ? "text-brand-primary bg-brand-green/20 shadow-md border border-brand-green/30"
                      : "text-muted-foreground hover:text-brand-primary hover:bg-accent/50"
                  }`}
                >
                  <div className={`p-1.5 rounded-md transition-all duration-300 ${
                    location.pathname === item.path 
                      ? "bg-brand-accent shadow-sm" 
                      : "bg-transparent"
                  }`}>
                    <item.icon className={`h-4 w-4 ${
                      location.pathname === item.path ? "text-white" : ""
                    }`} />
                  </div>
                  <span className={`text-xs font-medium truncate w-full text-center ${
                    location.pathname === item.path ? "font-semibold" : ""
                  }`}>
                    {item.label}
                  </span>
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
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
