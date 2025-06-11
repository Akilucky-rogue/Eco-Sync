
import { ReactNode } from "react";
import Navigation from "./Navigation";
import DesktopHeader from "./DesktopHeader";
import NotificationSystem from "./NotificationSystem";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 overflow-x-hidden">
      {/* Desktop Header */}
      <DesktopHeader />

      {/* Mobile Header */}
      <header className="md:hidden bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl">
        <div className="flex items-center justify-between py-3 px-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-accent to-brand-accent/80 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-green rounded-full border border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold">EcoSync</h1>
              <p className="text-xs text-blue-200">Marine Conservation</p>
            </div>
          </div>
          <NotificationSystem />
        </div>
      </header>

      {/* Main Content with proper responsive constraints */}
      <main className="pb-20 md:pb-8 pt-4 overflow-x-hidden">
        <div className="container-responsive">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      <Navigation />
    </div>
  );
};

export default Layout;
