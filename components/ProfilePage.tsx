
import React from 'react';
import { ArrowLeftIcon, Cog6ToothIcon, CreditCardIcon, InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { ViewState } from '../types';

interface ProfilePageProps {
  onNavigate: (view: ViewState) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  
  const menuItems = [
    { label: 'Settings', icon: Cog6ToothIcon, view: 'settings' as ViewState },
    { label: 'Plan / Membership', icon: CreditCardIcon, view: 'subscription' as ViewState },
    { label: 'About', icon: InformationCircleIcon, view: 'about' as ViewState },
    { label: 'Contact / Help', icon: QuestionMarkCircleIcon, view: 'contact' as ViewState },
  ];

  return (
    <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in flex flex-col items-center">
        {/* Header */}
        <header className="w-full px-6 pt-8 pb-4 flex items-center relative mb-4">
            <button className="absolute left-4 p-2 text-evergreen">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="w-full text-center font-display font-black text-2xl text-evergreen uppercase tracking-wide">
                Profile
            </h1>
        </header>

        {/* Profile Avatar */}
        <div className="w-48 h-48 rounded-full bg-evergreen mb-6 shadow-xl flex items-center justify-center">
            {/* Placeholder for user image */}
            <span className="text-4xl text-white font-serif">AM</span>
        </div>

        {/* User Info */}
        <div className="text-center mb-10">
            <h2 className="font-display font-black text-2xl text-evergreen uppercase mb-1">
                Anne Madsen
            </h2>
            <p className="font-serif text-evergreen/80">
                anne.madsen@gmail.com
            </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full px-8 space-y-4 max-w-md">
            {menuItems.map((item) => (
                <button 
                    key={item.label}
                    onClick={() => onNavigate(item.view)}
                    className="w-full bg-[#E8F7EA] hover:bg-[#D6F9DD] text-evergreen rounded-2xl p-4 flex items-center gap-4 transition-colors text-left"
                >
                    <item.icon className="w-6 h-6 opacity-80" />
                    <span className="font-bold text-lg">{item.label}</span>
                </button>
            ))}
        </div>

    </div>
  );
};

export default ProfilePage;
