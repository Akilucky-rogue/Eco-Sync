
import SocialFeed from "../components/SocialFeed";
import ErrorBoundary from "../components/ErrorBoundary";

const Social = () => {
  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#014F86] mb-2">Community Hub</h1>
          <p className="text-gray-600">Connect with fellow eco-warriors, share your impact, and join cleanup teams</p>
        </div>

        <SocialFeed />
      </div>
    </ErrorBoundary>
  );
};

export default Social;
