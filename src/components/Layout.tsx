
import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <header className="hidden md:block bg-[#014F86] text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#FF6F61] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-2xl font-bold">EcoSync</h1>
          </div>
          <nav className="flex space-x-6">
            <a href="/" className="hover:text-[#C5E4CF] transition-colors">Home</a>
            <a href="/events" className="hover:text-[#C5E4CF] transition-colors">Events</a>
            <a href="/profile" className="hover:text-[#C5E4CF] transition-colors">Profile</a>
            <a href="/dashboard" className="hover:text-[#C5E4CF] transition-colors">Impact</a>
            <a href="/admin" className="hover:text-[#C5E4CF] transition-colors">Admin</a>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-[#014F86] text-white p-4 shadow-lg">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 bg-[#FF6F61] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <h1 className="text-xl font-bold">EcoSync</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Navigation */}
      <Navigation />
    </div>
  );
};

export default Layout;
