import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface ProductGalleryProps {
  products: Product[];
  personalizedImages: Record<string, string>;
  viewMode: 'products' | 'generated';
  show: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ products, personalizedImages, viewMode, show }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      {products.map((product, index) => (
        <div 
          key={product.id}
          className={`transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <ProductCard
            product={product}
            generatedImageUrl={personalizedImages[product.id]}
            viewMode={viewMode}
          />
        </div>
      ))}
    </div>
  );
};