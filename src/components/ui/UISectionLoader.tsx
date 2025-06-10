interface UISectionLoaderProps {
  variant?: 'default' | 'hero' | 'feature' | 'testimonials' | 'compact';
  className?: string;
}

export const UISectionLoader = ({ variant = 'default', className = '' }: UISectionLoaderProps) => {
  const getSkeletonContent = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="w-full max-w-6xl mx-auto px-4 py-20">
            {/* Hero title skeleton */}
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto mb-6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8 animate-pulse"></div>
            </div>

            {/* Hero form skeleton */}
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-8">
              <div className="h-12 bg-gray-200 rounded-md flex-1 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-md w-32 animate-pulse"></div>
            </div>

            {/* Review platforms skeleton */}
            <div className="flex justify-center gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        );

      case 'feature':
        return (
          <div className="w-full py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Content side */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-12 bg-gray-200 rounded-md w-40 animate-pulse"></div>
                </div>

                {/* Image side */}
                <div className="w-full md:w-1/2">
                  <div className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="w-full py-16">
            <div className="max-w-6xl mx-auto px-4 text-center mb-16">
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
            </div>

            <div className="flex gap-6 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-80 flex-shrink-0 border border-gray-200 rounded-lg p-6">
                  <div className="space-y-4 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'compact':
        return (
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto px-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className={`w-full bg-white ${className}`}>{getSkeletonContent()}</div>;
};
