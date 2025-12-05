
import React from 'react';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';

const SubscriptionPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in flex flex-col">
       <header className="px-6 pt-8 pb-2 flex items-center relative shrink-0">
            <button onClick={onBack} className="absolute left-4 p-2 text-evergreen">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="w-full text-center font-display font-black text-2xl text-evergreen uppercase tracking-wide">
                Membership
            </h1>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4">
            
            <div className="text-center px-8 mb-2">
                 <h2 className="text-evergreen font-black text-lg leading-tight">Unlock the full power of DitMad</h2>
                 <p className="text-evergreen/60 text-xs font-bold mt-1">Choose a plan that fits your health goals</p>
            </div>

            {/* Pro Plan - Highlighted (Upsell Target) */}
            <div className="bg-evergreen rounded-[2rem] p-6 relative shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#61DF26] text-evergreen text-[10px] font-black px-4 py-1.5 rounded-bl-2xl">
                    MOST POPULAR
                </div>
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="font-display font-black text-3xl text-white">Pro</h2>
                        <p className="text-white/60 text-xs font-bold">Perfect for daily use</p>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-black text-[#61DF26]">19 kr</span>
                        <span className="text-white/60 text-xs font-bold block">/month</span>
                    </div>
                </div>
                
                <div className="h-px w-full bg-white/10 mb-4"></div>

                <ul className="space-y-2 mb-6">
                    <Feature text="Unlimited daily scans" dark />
                    <Feature text="Full ingredient breakdown" dark />
                    <Feature text="Compare up to 3 products" dark />
                    <Feature text="90 days scan history" dark />
                    <Feature text="Basic dietary filters" dark />
                </ul>
                <button className="w-full py-3.5 rounded-xl font-black bg-[#61DF26] text-evergreen shadow-lg hover:bg-[#52c41f] transition-transform active:scale-95 uppercase tracking-wide text-sm">
                    Start 7-Day Free Trial
                </button>
            </div>

             {/* Pro+ Plan */}
             <div className="bg-gradient-to-b from-[#D6F9DD] to-[#E8F7EA] rounded-[2rem] p-6 border border-evergreen/5">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="font-display font-black text-2xl text-evergreen">Pro +</h2>
                        <p className="text-evergreen/60 text-xs font-bold">For health enthusiasts</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-evergreen">39 kr</span>
                        <span className="text-evergreen/60 text-xs font-bold block">/month</span>
                    </div>
                </div>

                <ul className="space-y-2 mb-6">
                    <Feature text="Everything in Pro" />
                    <Feature text="Deep AI health insights" />
                    <Feature text="Unlimited ranked alternatives" />
                    <Feature text="Personalized dietary modes" />
                    <Feature text="Weekly progress reports" />
                </ul>
                <button className="w-full py-3.5 rounded-xl font-black bg-evergreen text-white shadow-md active:scale-95 uppercase tracking-wide text-sm">
                    Upgrade to Pro+
                </button>
            </div>

            {/* Free Plan */}
            <div className="bg-white rounded-[2rem] p-6 border-2 border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-display font-black text-xl text-evergreen/80">Free</h2>
                    <span className="font-bold text-evergreen/40 text-sm">Current Plan</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                    <Feature text="6 scans per day" muted />
                    <Feature text="Basic health score (3 colors)" muted />
                    <Feature text="1 Alternative per product" muted />
                </ul>
            </div>
            
            <div className="text-center text-[10px] text-evergreen/40 px-6 pb-4">
                Recurring billing. Cancel anytime. <br/> 
                Terms and Conditions apply.
            </div>

        </div>
    </div>
  );
};

const Feature: React.FC<{ text: string; dark?: boolean; muted?: boolean }> = ({ text, dark, muted }) => (
    <li className={`flex items-start gap-3 text-xs font-bold leading-relaxed ${dark ? 'text-white/90' : 'text-evergreen'}`}>
        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${dark ? 'bg-[#61DF26] text-evergreen' : (muted ? 'bg-gray-200 text-gray-500' : 'bg-evergreen text-white')}`}>
            <CheckIcon className="w-2.5 h-2.5" />
        </div>
        <span className={muted ? 'opacity-70' : ''}>{text}</span>
    </li>
);

export default SubscriptionPage;
