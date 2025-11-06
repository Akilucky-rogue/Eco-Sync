import { useState, useCallback } from 'react';
import { Upload, Loader2, Trash2, Recycle, Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ClassificationResult {
  wasteType: string;
  confidence: number;
  subCategory: string;
  recyclable: boolean;
  estimatedWeight: string;
  environmentalImpact: string;
  disposalRecommendation: string;
}

const wasteTypeColors: Record<string, string> = {
  plastic: 'bg-blue-500',
  metal: 'bg-gray-500',
  organic: 'bg-green-500',
  glass: 'bg-cyan-500',
  paper: 'bg-yellow-600',
  electronic: 'bg-purple-500',
  textile: 'bg-pink-500',
  mixed: 'bg-orange-500',
  other: 'bg-gray-400',
};

const wasteTypeIcons: Record<string, any> = {
  plastic: '🥤',
  metal: '🔩',
  organic: '🍃',
  glass: '🍾',
  paper: '📄',
  electronic: '🔌',
  textile: '👕',
  mixed: '♻️',
  other: '🗑️',
};

const WasteClassifier = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [classifying, setClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('Image size must be less than 10MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setResult(null); // Clear previous results
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const classifyWaste = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setClassifying(true);
    setResult(null);

    try {
      console.log('Calling classify-waste edge function...');
      
      const { data, error } = await supabase.functions.invoke('classify-waste', {
        body: { imageBase64: selectedImage }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from classification');
      }

      console.log('Classification result:', data);
      setResult(data as ClassificationResult);
      toast.success('Waste classified successfully!');
    } catch (error: any) {
      console.error('Classification error:', error);
      toast.error(error.message || 'Failed to classify waste. Please try again.');
    } finally {
      setClassifying(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-brand-primary to-blue-600 rounded-xl">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle>AI Waste Classifier</CardTitle>
              <CardDescription>
                Upload an image of waste to identify its type and get disposal recommendations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-brand-primary bg-brand-secondary/10'
                : 'border-gray-300 hover:border-brand-primary'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!selectedImage ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop an image here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Select Image</span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={selectedImage}
                    alt="Waste to classify"
                    className="max-h-96 rounded-lg shadow-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={clearImage}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={classifyWaste}
                  disabled={classifying}
                  className="w-full md:w-auto"
                >
                  {classifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Classifying...
                    </>
                  ) : (
                    <>
                      <Recycle className="mr-2 h-4 w-4" />
                      Classify Waste
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Classification Results */}
          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-brand-primary">Classification Results</h3>
                <Badge className={`${wasteTypeColors[result.wasteType]} text-white`}>
                  {wasteTypeIcons[result.wasteType]} {result.wasteType.toUpperCase()}
                </Badge>
              </div>

              {/* Confidence Score */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Confidence Score</span>
                      <span className="text-sm font-bold text-brand-primary">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={result.confidence * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Sub-Category</p>
                        <p className="text-base font-semibold mt-1">{result.subCategory}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${result.recyclable ? 'bg-green-100' : 'bg-red-100'}`}>
                        {result.recyclable ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Recyclable</p>
                        <p className="text-base font-semibold mt-1">
                          {result.recyclable ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Leaf className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Estimated Weight</p>
                        <p className="text-base font-semibold mt-1">{result.estimatedWeight}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                        <Recycle className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">Disposal Recommendation</p>
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                          {result.disposalRecommendation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Environmental Impact */}
              <Alert className="border-green-200 bg-green-50">
                <Leaf className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <span className="font-medium">Environmental Impact:</span> {result.environmentalImpact}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-2">How it works:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Upload a clear photo of the waste item</li>
                <li>AI analyzes the image using advanced computer vision</li>
                <li>Get instant classification with confidence score</li>
                <li>Receive proper disposal recommendations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteClassifier;
