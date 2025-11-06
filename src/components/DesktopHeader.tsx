
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationSystem from "./NotificationSystem";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const DesktopHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const primaryNavItems = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/waste-classifier", label: "AI Classifier" },
    { href: "/social", label: "Community" }
  ];

  const secondaryNavItems = [
    { href: "/gamification", label: "Rewards" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/events/manage", label: "Manage" },
    { href: "/profile", label: "Profile" },
    { href: "/admin", label: "Admin" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="hidden md:block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary text-white shadow-xl border-b border-brand-secondary/20">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-accent/80 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-bold text-lg transform -rotate-3">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Eco-Sanjivani
              </h1>
              <p className="text-xs text-blue-200 hidden lg:block">Marine Conservation Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8">
            {/* Primary Navigation */}
            <nav className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
              {primaryNavItems.map((item) => (
                <Link 
                  key={item.href}
                  to={item.href} 
                  className={`relative px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-white/20 text-white shadow-sm"
                      : "hover:bg-white/10 text-blue-100 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Secondary Navigation */}
            <nav className="flex space-x-1 border-l border-white/20 pl-6">
              {secondaryNavItems.slice(0, 3).map((item) => (
                <Link 
                  key={item.href}
                  to={item.href} 
                  className={`relative px-3 py-2 rounded-md transition-all duration-300 text-sm ${
                    isActive(item.href)
                      ? "bg-white/15 text-white"
                      : "hover:bg-white/10 text-blue-200 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <NotificationSystem />
            
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-white/10 gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button for smaller desktop screens */}
          <div className="xl:hidden flex items-center gap-4">
            <NotificationSystem />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Collapsible Menu for smaller desktop screens */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-white/20 py-4">
            <div className="grid grid-cols-2 gap-2">
              {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-white/20 text-white font-medium"
                      : "text-blue-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DesktopHeader;
