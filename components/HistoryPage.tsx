
import React from 'react';
import { ArrowLeftIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutline, HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HistoryItem } from '../types';

interface HistoryPageProps {
    history: HistoryItem[];
    onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onBack }) => {
  return (
    <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in">
        {/* Header */}
        <header className="px-6 pt-8 pb-4 flex items-center relative">
            <button onClick={onBack} className="absolute left-4 p-2 text-evergreen">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="w-full text-center font-display font-black text-2xl text-evergreen uppercase tracking-wide">
                History
            </h1>
        </header>

        {/* List Content */}
        <div className="px-4 space-y-3 mt-2">
            {history.map((item, idx) => (
                <div key={idx} className="bg-[#E8F7EA] rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Placeholder Product Image */}
                        <div className="w-12 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                             {item.image ? (
                                <img src={item.image} className="w-full h-full object-cover mix-blend-multiply" alt={item.productName} />
                             ) : (
                                <div className="bg-gray-100 w-full h-full flex items-center justify-center text-[8px] text-evergreen/30">IMG</div>
                             )}
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="font-bold text-evergreen text-sm">{item.brand}</span>
                            <span className="text-[10px] font-bold text-evergreen/60">{item.productName}</span>
                            <div className="flex gap-1 mt-1">
                                {[1,2,3,4,5].map((dot) => (
                                    <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (item.numericScore / 20) ? 'bg-evergreen' : 'border border-evergreen/40'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {item.liked ? (
                            <HeartIcon className="w-5 h-5 text-evergreen" />
                        ) : (
                            <HeartOutline className="w-5 h-5 text-evergreen/60" />
                        )}
                        {item.saved ? (
                            <BookmarkIcon className="w-5 h-5 text-evergreen" />
                        ) : (
                            <BookmarkOutline className="w-5 h-5 text-evergreen/60" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default HistoryPage;
