import React from 'react';
import useAuthStore from '../Authentication/UserAuthStore';

const LoadingSpinner = () => {

  return (
    <div
     className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-90 backdrop-blur-sm">
      <div className="relative h-16 w-16">
        {/* Outer Ring */}
        <div className="absolute h-full w-full rounded-full border-4 border-t-transparent border-blue-500 border-opacity-30 animate-spin"></div>
        
        {/* Inner Spinner */}
        <div className="absolute h-full w-full rounded-full border-4 border-t-transparent border-blue-500 border-opacity-80 animate-spin delay-75"></div>
        
        {/* Optional Text */}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform text-sm font-medium text-gray-500">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;