import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
  text?: string;
}

export const PageLoader = ({ text = 'Loading...' }: PageLoaderProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

export default PageLoader;
