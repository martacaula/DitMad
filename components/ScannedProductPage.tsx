import React, { useState } from 'react';
import { ProductAnalysis } from '../types';
import { MagnifyingGlassIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ScannedProductPageProps {
  analysis: ProductAnalysis;
  imagePreview: string;
  onProductClick: () => void;
}

const ScannedProductPage: React.FC<ScannedProductPageProps> = ({ analysis, imagePreview, onProductClick }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Diabetes']);
  const filters = ["Lactose Intolerance", "Celiac Disease", "Diabetes", "Food Allergies"];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
        if (prev.includes(filter)) return prev.filter(f => f !== filter);
        return [...prev, filter];
    });
  };

  return (
    <div className="min-h-screen bg-white pb-32 animate-fade-in font-sans">
      
      {/* Top Header - White bg version */}
      <div className="pt-8 pb-4 flex flex-col items-center px-4 space-y-4 bg-white z-10 sticky top-0">
        <h1 className="font-display font-black text-4xl tracking-wide text-evergreen">DitMad</h1>
        
        <div className="w-full bg-[#E8F7EA] rounded-full h-12 flex items-center px-4 shadow-sm max-w-md mx-auto">
            <MagnifyingGlassIcon className="w-5 h-5 text-evergreen/70 mr-2" />
            <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent text-evergreen placeholder-evergreen/50 w-full focus:outline-none font-bold text-sm"
            />
        </div>

        <div className="w-full overflow-x-auto hide-scrollbar pb-1">
           <div className="flex gap-2 px-2 whitespace-nowrap">
              {filters.map((filter) => {
                 const isSelected = selectedFilters.includes(filter);
                 return (
                   <div 
                     key={filter}
                     onClick={() => toggleFilter(filter)}
                     className={`px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 cursor-pointer
                        ${isSelected ? 'bg-evergreen text-white' : 'bg-[#E8F7EA] text-evergreen'}`}
                   >
                     {filter}
                     {isSelected && <XMarkIcon className="w-3 h-3 text-white" />}
                   </div>
                 );
              })}
           </div>
        </div>
      </div>

      {/* Main Product Card */}
      <div className="px-4 mt-2">
         <div 
            onClick={onProductClick}
            className="bg-[#E8F7EA] rounded-[2rem] p-6 relative cursor-pointer active:scale-95 transition-transform shadow-sm"
         >
            {/* Heart Icon */}
            <div className="absolute top-6 right-6">
                <HeartIcon className="w-6 h-6 text-evergreen" />
            </div>

            {/* Product Image centered */}
            <div className="w-full h-48 flex items-center justify-center mb-4">
                 <img 
                    src={imagePreview} 
                    alt={analysis.productName} 
                    className="h-full object-contain drop-shadow-md mix-blend-multiply"
                 />
            </div>

            {/* Product Info */}
            <div className="mb-6">
                <h2 className="font-display font-black text-2xl text-evergreen leading-none">
                    {analysis.brand}
                </h2>
                <h3 className="font-display font-bold text-lg text-evergreen opacity-80">
                     {analysis.productName}
                </h3>
            </div>

            {/* Nutrition List & Score Circle */}
            <div className="flex justify-between items-end">
                {/* Simplified Nutrition List */}
                <div className="text-[10px] font-medium text-evergreen space-y-1 w-1/2">
                    <div className="flex justify-between">
                        <span>Energy</span>
                        <span className="opacity-70">~360 kcal</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Protein</span>
                        <span className="opacity-70">~13 g</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Carbs</span>
                        <span className="opacity-70">~57 g</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fiber</span>
                        <span className="opacity-70">~10 g</span>
                    </div>
                </div>

                {/* Score Circle */}
                <div className="relative w-20 h-20 flex items-center justify-center bg-evergreen rounded-full shadow-lg border-4 border-white">
                    <span className="text-white font-black text-xl">{analysis.numericScore}%</span>
                    <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90 pointer-events-none">
                         <circle 
                            cx="40" cy="40" r="36" 
                            stroke="white" strokeWidth="2" fill="none" 
                            className="opacity-20"
                        />
                        <circle 
                            cx="40" cy="40" r="36" 
                            stroke="white" strokeWidth="2" fill="none"
                            strokeDasharray="226"
                            strokeDashoffset={226 - (226 * analysis.numericScore) / 100}
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
         </div>
      </div>

      {/* See Similar */}
      <div className="mt-8 px-6">
          <h3 className="font-display font-black text-xl text-evergreen mb-4">See Similar</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
              {analysis.alternatives.map((alt, idx) => (
                  <div key={idx} className="min-w-[120px] bg-[#E8F7EA] rounded-2xl p-4 flex flex-col items-center text-center">
                       <div className="w-16 h-20 bg-white/60 rounded mb-2"></div>
                       <p className="font-bold text-xs text-evergreen line-clamp-2">{alt.name}</p>
                       <div className="flex gap-0.5 mt-2">
                           {[1,2,3,4,5].map(d => (
                               <div key={d} className="w-1.5 h-1.5 bg-evergreen rounded-full"></div>
                           ))}
                       </div>
                  </div>
              ))}
              {/* Add dummy mock cards to look like design */}
              <div className="min-w-[120px] bg-[#E8F7EA] rounded-2xl p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-20 bg-white/60 rounded mb-2"></div>
                    <p className="font-bold text-xs text-evergreen">Salling ØKO</p>
                    <div className="flex gap-0.5 mt-2">
                        {[1,2,3,4].map(d => <div key={d} className="w-1.5 h-1.5 bg-evergreen rounded-full"></div>)}
                        <div className="w-1.5 h-1.5 border border-evergreen rounded-full"></div>
                    </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ScannedProductPage;