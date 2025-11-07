
import React from 'react';
import { NikeLogo } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <NikeLogo className="h-6 w-auto text-gray-400" />
        </div>
        <p className="text-xs text-gray-500 mt-4 sm:mt-0">
          © {new Date().getFullYear()} Nike AI. All Rights Reserved. This is a conceptual project.
        </p>
      </div>
    </footer>
  );
};
