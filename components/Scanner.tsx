
import React, { useRef, useState } from 'react';
import { analyzeProductImage, fileToBase64 } from '../services/geminiService';
import { ProductAnalysis } from '../types';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ScannerProps {
  onScanStart: () => void;
  onScanComplete: (analysis: ProductAnalysis, imagePreview: string) => void;
  triggerInput: boolean;
  setTriggerInput: (val: boolean) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanStart, onScanComplete, triggerInput, setTriggerInput }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Default to empty array as requested
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  React.useEffect(() => {
    if (triggerInput) {
      fileInputRef.current?.click();
      setTriggerInput(false);
    }
  }, [triggerInput, setTriggerInput]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    onScanStart(); 

    try {
      const base64 = await fileToBase64(file);
      const result = await analyzeProductImage(base64);
      onScanComplete(result, objectUrl);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
      window.location.reload(); 
    }
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  const filters = [
    "Lactose Intolerance", 
    "Celiac Disease", 
    "Diabetes", 
    "Food Allergies", 
    "IBS", 
    "IBD", 
    "GERD",
    "Hypertension",
    "Kidney disease"
  ];

  return (
    <div className="flex flex-col h-screen bg-evergreen text-frostedMint relative overflow-hidden">
      
      {/* Header Area */}
      <div className="pt-8 pb-1 flex flex-col items-center px-4 space-y-3 bg-evergreen z-10">
        <h1 className="font-display font-black text-4xl tracking-wide text-white">DitMad</h1>
        
        {/* Search Bar */}
        <div className="w-full bg-[#E8F7EA] rounded-full h-12 flex items-center px-4 shadow-sm max-w-md mx-auto">
            <MagnifyingGlassIcon className="w-5 h-5 text-evergreen/70 mr-2" />
            <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent text-evergreen placeholder-evergreen/50 w-full focus:outline-none font-bold text-sm"
            />
        </div>

        {/* Scrollable Filters */}
        <div className="w-full overflow-x-auto hide-scrollbar pb-1">
           <div className="flex gap-2 px-2 whitespace-nowrap">
              {filters.map((filter) => {
                 const isSelected = selectedFilters.includes(filter);
                 return (
                   <button 
                     key={filter}
                     onClick={() => toggleFilter(filter)}
                     className={`px-4 py-2 rounded-full text-[10px] font-bold transition-colors flex items-center gap-2
                        ${isSelected ? 'bg-[#D6F9DD] text-evergreen' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                   >
                     {filter}
                     {isSelected && <XMarkIcon className="w-3 h-3" />}
                   </button>
                 );
              })}
           </div>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col items-center px-4 pt-2">
        {/* Camera Placeholder / Frame */}
        <div 
          className="w-full h-[55vh] max-w-md bg-black rounded-[2.5rem] border border-white/10 relative overflow-hidden flex items-center justify-center cursor-pointer active:opacity-90 transition-opacity shadow-2xl"
          onClick={() => fileInputRef.current?.click()}
        >
          {/* Corner markers */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-[3px] border-l-[3px] border-white/50 rounded-tl-2xl"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-t-[3px] border-r-[3px] border-white/50 rounded-tr-2xl"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-[3px] border-l-[3px] border-white/50 rounded-bl-2xl"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-[3px] border-r-[3px] border-white/50 rounded-br-2xl"></div>
          
          <div className="text-center opacity-60">
             {/* Tap to scan */}
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      
      {/* Spacer for Bottom Nav */}
      <div className="h-28"></div>
    </div>
  );
};

export default Scanner;
