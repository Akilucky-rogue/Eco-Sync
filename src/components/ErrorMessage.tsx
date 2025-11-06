import { AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage = ({ 
  title = 'Error', 
  message, 
  onRetry,
  className 
}: ErrorMessageProps) => {
  return (
    <div className={className}>
      <Alert variant="destructive" className="bg-white border-red-200">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="font-bold">{title}</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="border-red-300 hover:bg-red-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
