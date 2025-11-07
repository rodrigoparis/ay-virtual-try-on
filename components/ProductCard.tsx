import React from 'react';
import { ImageWithLoading } from './ImageWithLoading';
import { SpinnerIcon } from './Icons';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  generatedImageUrl?: string;
  viewMode: 'products' | 'generated';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, generatedImageUrl, viewMode }) => {
  const imageUrl = viewMode === 'generated' && generatedImageUrl ? generatedImageUrl : product.image;

  return (
    <div className="group">
      <div className="aspect-square bg-gray-900/50 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
        {imageUrl ? (
          <ImageWithLoading src={imageUrl} alt={product.name} />
        ) : (
          <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
            <SpinnerIcon className="w-8 h-8 text-gray-500" />
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-white tracking-wider">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-400">{product.category}</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium text-white">${product.price}</p>
        </div>
      </div>
       <button className="mt-4 w-full bg-white text-black text-sm font-bold py-2.5 rounded-full hover:bg-gray-300 transition-colors duration-200">
          ADD
        </button>
    </div>
  );
};