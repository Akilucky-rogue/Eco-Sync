
import { ReactNode } from "react";
import Navigation from "./Navigation";
import NotificationSystem from "./NotificationSystem";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
      {/* Enhanced Desktop Header */}
      <header className="hidden md:block bg-gradient-to-r from-[#014F86] via-[#0066A3] to-[#014F86] text-white shadow-xl border-b border-blue-700/20">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-bold text-lg transform -rotate-3">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                EcoSync
              </h1>
              <p className="text-xs text-blue-200">Marine Conservation Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex items-center space-x-1">
              {/* Main Navigation */}
              <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
                {[
                  { href: "/", label: "Home" },
                  { href: "/events", label: "Events" },
                  { href: "/social", label: "Community" }
                ].map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="relative px-4 py-2 rounded-lg hover:bg-white/15 transition-all duration-300 group text-sm font-medium"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </a>
                ))}
              </div>
              
              {/* Secondary Navigation */}
              <div className="flex space-x-1 ml-4">
                {[
                  { href: "/gamification", label: "Rewards" },
                  { href: "/dashboard", label: "Dashboard" }
                ].map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group text-sm"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </a>
                ))}
              </div>

              {/* Admin/Management Navigation */}
              <div className="flex space-x-1 ml-4 border-l border-white/20 pl-4">
                {[
                  { href: "/events/manage", label: "Manage" },
                  { href: "/profile", label: "Profile" },
                  { href: "/admin", label: "Admin" }
                ].map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group text-sm opacity-90 hover:opacity-100"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </a>
                ))}
              </div>
            </nav>
            <NotificationSystem />
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Header */}
      <header className="md:hidden bg-gradient-to-r from-[#014F86] to-[#0066A3] text-white shadow-xl">
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6F61] to-[#E55B50] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">EcoSync</h1>
              <p className="text-xs text-blue-200">Marine Conservation</p>
            </div>
          </div>
          <NotificationSystem />
        </div>
      </header>

      {/* Main Content with enhanced spacing */}
      <main className="pb-24 md:pb-8 pt-6">
        {children}
      </main>

      {/* Mobile Navigation */}
      <Navigation />
    </div>
  );
};

export default Layout;
