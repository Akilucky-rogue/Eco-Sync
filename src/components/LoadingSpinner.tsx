import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

export const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn('animate-spin text-brand-primary', sizeClasses[size], className)} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
