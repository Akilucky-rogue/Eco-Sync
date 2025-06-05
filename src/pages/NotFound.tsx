
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="w-20 h-20 bg-[#C5E4CF] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🌊</span>
          </div>
          <h1 className="text-2xl font-bold text-[#014F86] mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for seems to have drifted away like debris in the Arabian Sea.
          </p>
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
