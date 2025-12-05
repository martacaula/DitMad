import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    // Updated position to absolute within the relative App container, or fixed to viewport but centered
    <div className="absolute inset-0 bg-evergreen z-50 flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center">
        <h1 className="font-display font-black text-4xl text-frostedMint tracking-tight mb-8">
            DitMad
        </h1>
        <div className="w-12 h-12 border-4 border-frostedMint border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;