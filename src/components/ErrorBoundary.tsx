import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            <Alert variant="destructive" className="bg-white border-red-200">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-xl font-bold">Something went wrong</AlertTitle>
              <AlertDescription className="mt-2 space-y-4">
                <p className="text-base">
                  We encountered an unexpected error. Don't worry, your data is safe.
                </p>
                
                {this.state.error && (
                  <details className="mt-4 p-4 bg-red-50 rounded-lg">
                    <summary className="cursor-pointer font-medium text-sm">
                      Error Details (for developers)
                    </summary>
                    <pre className="mt-2 text-xs overflow-auto max-h-40 text-red-900">
                      {this.state.error.toString()}
                      {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}

                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={this.handleReset}
                    className="bg-brand-primary hover:bg-brand-primary/90"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={this.handleGoHome}
                    variant="outline"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            <div className="text-center text-sm text-gray-600">
              <p>If this problem persists, please contact support.</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
