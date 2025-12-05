
import React from 'react';
import { UserIcon, ArrowPathIcon, ClipboardDocumentListIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ViewState } from '../types';

interface BottomNavProps {
  activeView: ViewState;
  onNavClick: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavClick }) => {
  
  const getIconClass = (groupName: string) => {
      let isActive = false;
      if (groupName === 'my_lists' && ['my_lists', 'history', 'create_list', 'list_detail'].includes(activeView)) isActive = true;
      if (groupName === 'alternatives' && activeView === 'alternatives') isActive = true;
      if (groupName === 'community' && activeView === 'community') isActive = true;
      if (groupName === 'profile' && ['profile', 'settings', 'subscription', 'about', 'contact'].includes(activeView)) isActive = true;

      return `flex flex-col items-center justify-center gap-1 transition-colors w-14 ${isActive ? 'text-evergreen scale-110 font-black' : 'text-evergreen/60 hover:text-evergreen'}`;
  };

  // Only highlight the center button as "Active/Filled" if we are on the home/scanning flow
  const isHomeActive = ['home', 'scanned_product', 'product_detail', 'loading'].includes(activeView);

  return (
    // Updated fixed positioning to align with centered max-width container
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 pointer-events-none">
      <div className="relative h-24 mx-auto pointer-events-auto">
        
        {/* SVG Background with Cutout */}
        <div className="absolute bottom-0 left-0 w-full h-20 drop-shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
           <svg 
             viewBox="0 0 375 80" 
             className="w-full h-full" 
             preserveAspectRatio="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path 
               d="M0,25 Q0,0 25,0 L138,0 Q155,0 162,12 Q172,38 187.5,38 Q203,38 213,12 Q220,0 237,0 L350,0 Q375,0 375,25 L375,80 L0,80 Z" 
               fill="#E8F7EA" 
             />
           </svg>
        </div>

        {/* Content Container */}
        <div className="absolute bottom-0 w-full h-20 flex justify-between items-center px-6">
           {/* Left Group */}
           <div className="flex gap-4 sm:gap-8 mb-2">
              <button onClick={() => onNavClick('my_lists')} className={getIconClass('my_lists')}>
                <ClipboardDocumentListIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold">My list</span>
              </button>
              <button onClick={() => onNavClick('alternatives')} className={getIconClass('alternatives')}>
                <ArrowPathIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold">Alternatives</span>
              </button>
           </div>

           {/* Center Spacer */}
           <div className="w-20"></div>

           {/* Right Group */}
           <div className="flex gap-4 sm:gap-8 mb-2">
              <button onClick={() => onNavClick('community')} className={getIconClass('community')}>
                <UsersIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold">Community</span>
              </button>
              <button onClick={() => onNavClick('profile')} className={getIconClass('profile')}>
                <UserIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold">Profile</span>
              </button>
           </div>
        </div>

        {/* Floating Scan Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
             <button 
               onClick={() => onNavClick('home')}
               className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ease-out border-[4px] border-[#E8F7EA]
                 ${isHomeActive 
                    ? 'bg-evergreen scale-110 text-white' 
                    : 'bg-white text-evergreen hover:bg-gray-50'}`}
             >
               {/* Barcode Icon */}
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  {/* Viewfinder Corners */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5V4.875a1.125 1.125 0 011.125-1.125h2.625" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h2.625a1.125 1.125 0 011.125 1.125V7.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 16.5v2.625a1.125 1.125 0 01-1.125 1.125h-2.625" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 20.25H4.875A1.125 1.125 0 013.75 19.125V16.5" />
                  
                  {/* Vertical Barcode Lines */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25v7.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5v9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 8.25v7.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5v9" />
               </svg>
             </button>
        </div>

      </div>
    </div>
  );
};

export default BottomNav;
