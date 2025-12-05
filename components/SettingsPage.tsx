
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const SettingsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in">
       <header className="px-6 pt-8 pb-4 flex items-center relative">
            <button onClick={onBack} className="absolute left-4 p-2 text-evergreen">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="w-full text-center font-display font-black text-2xl text-evergreen uppercase tracking-wide">
                Settings
            </h1>
        </header>

        <div className="px-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                <span className="font-bold text-evergreen">Notifications</span>
                <div className="w-12 h-6 bg-evergreen rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
            </div>
             <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                <span className="font-bold text-evergreen">Language</span>
                <span className="text-sm font-bold text-evergreen/60">English</span>
            </div>
             <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                <span className="font-bold text-evergreen">Data Privacy</span>
                <span className="text-sm font-bold text-evergreen/60">Active</span>
            </div>
        </div>
    </div>
  );
};

export default SettingsPage;
