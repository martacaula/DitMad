import React from 'react';
import { ProductAnalysis } from '../types';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface ProductDetailPageProps {
  analysis: ProductAnalysis;
  imagePreview: string;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ analysis, imagePreview, onBack }) => {

  const renderRating = (rating: number, isNegative = false) => {
     return (
        <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= rating;
                return (
                    <div 
                        key={star} 
                        className={`w-2 h-2 rounded-full ${isFilled ? 'bg-evergreen' : 'border border-evergreen/50'}`}
                    ></div>
                );
            })}
        </div>
     );
  };

  return (
    <div className="min-h-screen bg-[#E8F7EA] pb-32 animate-fade-in font-sans">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 text-evergreen">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <span className="font-display font-black text-2xl text-evergreen">{analysis.brand}</span>
      </header>

      <div className="px-6">
        
        {/* Top Split Layout */}
        <div className="flex items-center justify-between mb-8">
            <div className="w-1/2 pr-2">
                <h2 className="font-display font-black text-2xl text-evergreen leading-tight mb-2">
                    {analysis.brand} Original
                </h2>
                <p className="font-sans text-evergreen/80 font-bold text-sm mb-6">
                    {analysis.productName}
                </p>

                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-evergreen uppercase">Overall</span>
                    <span className="text-5xl font-black text-evergreen">{analysis.numericScore}%</span>
                    <div className="flex gap-1 ml-1">
                        {[1,2,3,4,5].map(d => (
                            <div key={d} className={`w-2 h-2 rounded-full ${d <= (analysis.numericScore / 20) ? 'bg-evergreen' : 'border border-evergreen'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-1/2 relative h-48 flex justify-center items-center">
                <img 
                    src={imagePreview} 
                    alt="Product" 
                    className="h-full object-contain drop-shadow-xl mix-blend-multiply"
                />
            </div>
        </div>

        {/* Positives */}
        <div className="mb-6">
            <h3 className="font-display font-black text-xl text-evergreen mb-4">Positives</h3>
            <div className="space-y-4">
                {analysis.positives.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-bold text-evergreen text-sm">{item.label}</span>
                            <span className="text-[10px] text-evergreen/70 font-semibold">{item.comment || "Good value"}</span>
                        </div>
                        <div className="flex items-center gap-4 min-w-[120px] justify-end">
                            <span className="text-xs font-bold text-evergreen">{item.value}</span>
                            {renderRating(item.rating)}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Negatives */}
        <div className="mb-8">
            <h3 className="font-display font-black text-xl text-evergreen mb-4">Negatives</h3>
            <div className="space-y-4">
                 {analysis.negatives.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-bold text-evergreen text-sm">{item.label}</span>
                            <span className="text-[10px] text-evergreen/70 font-semibold">{item.comment || "Watch out"}</span>
                        </div>
                        <div className="flex items-center gap-4 min-w-[120px] justify-end">
                            <span className="text-xs font-bold text-evergreen">{item.value}</span>
                            {renderRating(item.rating, true)}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Alternative Products - Dark Cards */}
        <div className="mb-4">
            <h3 className="font-display font-black text-xl text-evergreen mb-4">Alternative Products</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 hide-scrollbar">
                {analysis.alternatives.map((alt, idx) => (
                    <div key={idx} className="flex-shrink-0 w-32 bg-evergreen rounded-2xl p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-20 bg-white/10 rounded mb-3 flex items-center justify-center">
                             {/* Image Placeholder */}
                        </div>
                        <p className="font-bold text-xs text-white leading-tight mb-2 h-8 flex items-center justify-center">{alt.name}</p>
                        <div className="flex gap-1">
                             {[1,2,3,4,5].map(d => <div key={d} className="w-1.5 h-1.5 bg-[#61DF26] rounded-full"></div>)}
                        </div>
                    </div>
                ))}
                 <div className="flex-shrink-0 w-32 bg-evergreen rounded-2xl p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-20 bg-white/10 rounded mb-3"></div>
                    <p className="font-bold text-xs text-white leading-tight mb-2 h-8 flex items-center justify-center">Salling ØKO</p>
                    <div className="flex gap-1">
                            {[1,2,3,4].map(d => <div key={d} className="w-1.5 h-1.5 bg-[#61DF26] rounded-full"></div>)}
                            <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
