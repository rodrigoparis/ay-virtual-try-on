
import React, { useState, useEffect } from 'react';
import { SpinnerIcon } from './Icons';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
}

export const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="relative w-full h-full bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SpinnerIcon className="w-8 h-8 text-gray-500" />
        </div>
      )}
      {error && (
         <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
            Image failed to load
         </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`object-cover object-center w-full h-full transition-opacity duration-500 ${isLoading || error ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};
