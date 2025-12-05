import React from 'react';
import { ProductAnalysis } from '../types';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface ResultCardProps {
  analysis: ProductAnalysis;
  imagePreview: string;
  onBack: () => void;
}

const StarRating: React.FC<{ rating: number, isNegative?: boolean }> = ({ rating, isNegative }) => {
    // For positives: 5 filled is best.
    // For negatives: We usually want to show intensity. 
    // If we stick to design: Filled dots = intensity of the metric?
    // Let's assume 5 circles. Filled = rating.
    
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <div 
                    key={star} 
                    className={`w-2 h-2 rounded-full ${star <= rating ? 'bg-evergreen' : 'border border-evergreen/30'}`}
                ></div>
            ))}
        </div>
    );
};

const ResultCard: React.FC<ResultCardProps> = ({ analysis, imagePreview, onBack }) => {
  
  return (
    <div className="min-h-screen bg-white pb-32 animate-fade-in font-sans">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-evergreen hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <span className="font-display font-black text-2xl text-evergreen">{analysis.brand}</span>
        <div className="w-8"></div> 
      </header>

      {/* Main Content */}
      <div className="px-6">
          
          {/* Top Section: Product Info & Score */}
          <div className="flex justify-between items-start mb-6">
              <div className="w-2/3 pr-4">
                  <h2 className="font-display font-black text-3xl text-evergreen leading-tight mb-2">
                      {analysis.productName}
                  </h2>
                  <p className="font-serif text-evergreen/70 italic text-sm">
                      {analysis.brand}
                  </p>
                  
                  {/* Overall Score Text */}
                  <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-evergreen/60">Overall</span>
                      <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-evergreen">{analysis.numericScore}%</span>
                          <span className="text-evergreen/40 font-bold">Health</span>
                      </div>
                  </div>
              </div>

              {/* Product Image */}
              <div className="w-1/3 relative">
                 <div className="bg-[#E8F7EA] rounded-2xl p-2 aspect-[3/4] flex items-center justify-center">
                    <img 
                        src={imagePreview} 
                        alt={analysis.productName} 
                        className="w-full h-full object-contain drop-shadow-md mix-blend-multiply"
                    />
                 </div>
                 {/* Flag or Badge if needed */}
                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full border-2 border-white"></div>
              </div>
          </div>

          {/* Positives Section */}
          <div className="mb-6">
              <h3 className="font-display font-black text-lg text-evergreen mb-3 uppercase tracking-wide">Positives</h3>
              <div className="bg-[#E8F7EA]/50 rounded-2xl p-4 space-y-4">
                  {analysis.positives.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                          <div className="flex flex-col">
                              <span className="font-bold text-evergreen text-sm">{item.label}</span>
                              <span className="text-[10px] text-evergreen/60 font-medium">{item.comment || item.value}</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="font-bold text-evergreen text-sm">{item.value}</span>
                              <StarRating rating={item.rating} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Negatives Section */}
          <div className="mb-8">
              <h3 className="font-display font-black text-lg text-evergreen mb-3 uppercase tracking-wide">Negatives</h3>
              <div className="space-y-4 px-2">
                   {analysis.negatives.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-evergreen/10 pb-2 last:border-0">
                          <div className="flex flex-col">
                              <span className="font-bold text-evergreen text-sm">{item.label}</span>
                              <span className="text-[10px] text-evergreen/60 font-medium">{item.comment || 'Attention required'}</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="font-bold text-evergreen text-sm">{item.value}</span>
                              <StarRating rating={item.rating} isNegative />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Alternative Products */}
          <div className="mb-4">
            <h3 className="font-display font-black text-lg text-evergreen mb-4 uppercase tracking-wide">Alternative Products</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-2 px-2">
                {analysis.alternatives.map((alt, idx) => (
                    <div key={idx} className="flex-shrink-0 w-28 bg-[#012b08] rounded-xl p-3 snap-start relative text-center">
                        <div className="w-16 h-20 bg-white/10 rounded mx-auto mb-2 flex items-center justify-center">
                             <span className="text-[10px] text-white/50">Img</span>
                        </div>
                        <p className="font-bold text-[10px] text-white leading-tight mb-1 h-8 overflow-hidden">{alt.name}</p>
                        <div className="flex justify-center gap-0.5 mt-1">
                             {[1,2,3,4,5].map(d => <div key={d} className="w-1 h-1 bg-freshGreen rounded-full"></div>)}
                        </div>
                    </div>
                ))}
            </div>
          </div>

      </div>
    </div>
  );
};

export default ResultCard;
