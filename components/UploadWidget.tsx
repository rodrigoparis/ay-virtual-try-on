
import React, { useState, useCallback } from 'react';
import { ProgressBar } from './ProgressBar';
import type { Product } from '../types';
import { UploadCloudIcon, CheckCircleIcon, XCircleIcon, RefreshCwIcon } from './Icons';

interface UploadWidgetProps {
  onFileUpload: (file: File) => void;
  isGenerating: boolean;
  progress: number;
  viewMode: 'products' | 'generated';
  onViewChange: (mode: 'products' | 'generated') => void;
  currentProduct: Product | null;
  hasGeneratedImages: boolean;
  onRegenerate: () => void;
  error: string | null;
}

const LoadingDots: React.FC = () => (
    <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-dotBounce" style={{ animationDelay: '-0.32s' }}></div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-dotBounce" style={{ animationDelay: '-0.16s' }}></div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-dotBounce"></div>
    </div>
);

export const UploadWidget: React.FC<UploadWidgetProps> = ({
  onFileUpload,
  isGenerating,
  progress,
  viewMode,
  onViewChange,
  currentProduct,
  hasGeneratedImages,
  onRegenerate,
  error
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };
  
  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const renderContent = () => {
    if (error) {
       return (
        <div className="text-center p-4">
            <XCircleIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-xs text-red-300">{error}</p>
            <label htmlFor="file-upload" className="mt-3 cursor-pointer inline-block text-xs font-semibold text-white hover:underline">Try another photo</label>
        </div>
       );
    }
    if (isGenerating) {
      return (
        <div className="w-full p-4">
          <div className="flex items-center justify-between mb-2">
             <div className="flex items-center space-x-2">
                <p className="text-xs font-semibold text-white uppercase tracking-widest">Generating</p>
                <LoadingDots/>
             </div>
             <p className="text-xs text-gray-400 font-mono">{Math.round(progress)}%</p>
          </div>
          <ProgressBar progress={progress} />
          <p className="text-xs text-gray-300 mt-2 truncate">
            {currentProduct ? `Applying to: ${currentProduct.name}` : 'Initializing...'}
          </p>
        </div>
      );
    }

    if (hasGeneratedImages) {
      return (
        <div className="p-2">
            <div className="flex items-center bg-gray-900 rounded-full p-1">
                <button 
                    onClick={() => onViewChange('products')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-300 ${viewMode === 'products' ? 'bg-white text-black' : 'text-white'}`}
                >
                    PRODUCTS
                </button>
                <button 
                    onClick={() => onViewChange('generated')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors duration-300 ${viewMode === 'generated' ? 'bg-white text-black' : 'text-white'}`}
                >
                    PERSONALIZED
                </button>
                <button onClick={onRegenerate} title="Regenerate with a new photo" className="ml-2 p-1 text-white hover:text-gray-400">
                    <RefreshCwIcon className="h-4 w-4"/>
                </button>
            </div>
        </div>
      );
    }
    
    return (
      <div 
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center border-2 border-dashed rounded-lg transition-colors duration-200 ${isDragging ? 'border-white bg-gray-700' : 'border-gray-600 hover:border-gray-400'}`}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
      >
        <UploadCloudIcon className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm font-semibold text-white">AI VIRTUAL TRY-ON</p>
        <p className="text-xs text-gray-400 mt-1">
          Drag & drop your photo or <label htmlFor="file-upload" className="font-semibold text-white cursor-pointer hover:underline">browse</label>
        </p>
      </div>
    );
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-72 bg-black/70 backdrop-blur-md rounded-xl shadow-2xl shadow-white/5 overflow-hidden ring-1 ring-white/10">
        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
        {renderContent()}
      </div>
    </div>
  );
};
