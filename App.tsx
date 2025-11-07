import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGallery } from './components/ProductGallery';
import { UploadWidget } from './components/UploadWidget';
import { generateModelImage } from './services/geminiService';
import { PRODUCTS } from './constants';
import type { Product } from './types';

export default function App() {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [personalizedImages, setPersonalizedImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'products' | 'generated'>('products');
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Trigger fade-in animation for gallery on mount
    const timer = setTimeout(() => setShowGallery(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const startGeneration = useCallback(async (photo: File) => {
    setIsGenerating(true);
    setError(null);
    setGenerationProgress(0);
    setViewMode('products');
    setPersonalizedImages({});
    const newImages: Record<string, string> = {};

    for (let i = 0; i < PRODUCTS.length; i++) {
      setCurrentProductIndex(i);
      const product = PRODUCTS[i];
      const productPhoto = product.image;

      if (!productPhoto) {
        console.error(`Product image for ${product.name} is missing in constants.ts.`);
        setError(`Cannot start generation, the image for ${product.name} is missing.`);
        setIsGenerating(false);
        return;
      }

      try {
        const generatedImage = await generateModelImage(photo, product, productPhoto);
        newImages[product.id] = generatedImage;
        setPersonalizedImages(prev => ({ ...prev, [product.id]: generatedImage }));
      } catch (err) {
        console.error(`Failed to generate image for ${product.name}:`, err);
        setError(`Sorry, we couldn't generate an image for ${product.name}. Please try a different photo.`);
        setIsGenerating(false);
        return;
      }
      setGenerationProgress(((i + 1) / PRODUCTS.length) * 100);
    }

    setTimeout(() => {
      setIsGenerating(false);
      setViewMode('generated');
    }, 1000);
  }, []);

  const handlePhotoUpload = (file: File) => {
    setUserPhoto(file);
    startGeneration(file);
  };
  
  const handleViewChange = (mode: 'products' | 'generated') => {
    if (Object.keys(personalizedImages).length > 0) {
      setViewMode(mode);
    }
  };

  const handleRegenerate = () => {
    if(userPhoto) {
      startGeneration(userPhoto);
    }
  };

  const currentProductForWidget = isGenerating ? PRODUCTS[currentProductIndex] : null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGallery
          products={PRODUCTS}
          personalizedImages={personalizedImages}
          viewMode={viewMode}
          show={showGallery}
        />
      </main>
      <Footer />
      <UploadWidget
        onFileUpload={handlePhotoUpload}
        isGenerating={isGenerating}
        progress={generationProgress}
        viewMode={viewMode}
        onViewChange={handleViewChange}
        currentProduct={currentProductForWidget}
        hasGeneratedImages={Object.keys(personalizedImages).length > 0}
        onRegenerate={handleRegenerate}
        error={error}
      />
    </div>
  );
}