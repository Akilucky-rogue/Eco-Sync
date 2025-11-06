import WasteClassifier from "@/components/WasteClassifier";
import ErrorBoundary from "@/components/ErrorBoundary";

const WasteClassification = () => {
  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-brand-primary mb-2">AI Waste Classification</h1>
          <p className="text-gray-600">
            Use artificial intelligence to identify waste types and get proper disposal recommendations
          </p>
        </div>

        <WasteClassifier />
      </div>
    </ErrorBoundary>
  );
};

export default WasteClassification;
