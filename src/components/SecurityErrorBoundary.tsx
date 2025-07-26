import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ShieldX, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Security-focused error boundary that prevents information disclosure
 * and provides safe error handling for security-sensitive components
 */
class SecurityErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging (in production, this should go to a secure logging service)
    console.error('Security Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // In production, you might want to report this to a security monitoring service
    // without exposing sensitive information
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Security-safe error UI that doesn't expose sensitive information
      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <Alert className="max-w-md">
            <ShieldX className="h-4 w-4" />
            <AlertTitle>Security Error</AlertTitle>
            <AlertDescription className="mt-2 mb-4">
              A security error occurred while processing your request. 
              This has been logged for review. Please try again or contact support if the issue persists.
            </AlertDescription>
            <div className="flex gap-2">
              <Button 
                onClick={this.handleRetry}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-3 w-3" />
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                size="sm"
                variant="secondary"
              >
                Refresh Page
              </Button>
            </div>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityErrorBoundary;