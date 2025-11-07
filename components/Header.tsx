
import React from 'react';
import { NikeLogo, SearchIcon, ShoppingBagIcon, UserIcon } from './Icons';

export const Header: React.FC = () => {
  const navItems = ['New & Featured', 'Men', 'Women', 'Kids', 'Sale'];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <NikeLogo className="h-8 w-auto text-white" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, i) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 animate-fadeIn"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* Icons and Search */}
          <div className="flex items-center space-x-4 animate-fadeIn" style={{ animationDelay: '700ms' }}>
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-900 border border-gray-700 rounded-full py-1.5 pl-10 pr-4 text-sm w-48 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all"
              />
            </div>
            <button className="p-1 rounded-full text-gray-400 hover:text-white transition-colors">
              <ShoppingBagIcon className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-white transition-colors">
              <UserIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
