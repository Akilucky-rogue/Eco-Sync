import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InteractiveMap from "@/components/InteractiveMap";
import PageLoader from "@/components/PageLoader";
import ErrorBoundary from "@/components/ErrorBoundary";

const Map = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return (
      <div className="container mx-auto p-4">
        <PageLoader text="Loading map..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#014F86] mb-2">Interactive Map</h1>
          <p className="text-gray-600">View and explore coastal cleanup events across India</p>
        </div>
        
        <InteractiveMap />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6F61] to-[#E55B50] flex items-center justify-center text-white font-bold">
                📍
              </div>
              <div>
                <h3 className="font-semibold text-[#014F86]">Event Markers</h3>
                <p className="text-sm text-gray-600">Click to view details</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                📍
              </div>
              <div>
                <h3 className="font-semibold text-[#014F86]">Your Location</h3>
                <p className="text-sm text-gray-600">Blue marker</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                ⚡
              </div>
              <div>
                <h3 className="font-semibold text-[#014F86]">Live Updates</h3>
                <p className="text-sm text-gray-600">Real-time events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Map;
