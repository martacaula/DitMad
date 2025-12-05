
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in text-center flex flex-col">
       <header className="px-6 pt-8 pb-4 flex items-center relative shrink-0">
            <button onClick={onBack} className="absolute left-4 p-2 text-evergreen">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="w-full text-center font-display font-black text-2xl text-evergreen uppercase tracking-wide">
                About
            </h1>
        </header>

        <div className="flex-1 overflow-y-auto px-6 mt-4 pb-8">
            <h2 className="text-3xl font-black text-evergreen mb-2">DitMadKompass</h2>
            <p className="text-evergreen/60 font-bold mb-8 text-sm">Version 1.0.0</p>
            
            <div className="text-left space-y-6">
                <div>
                    <h3 className="font-display font-black text-lg text-evergreen mb-2">Our Mission</h3>
                    <p className="text-sm text-evergreen/80 leading-relaxed font-medium">
                        DitMadKompass is designed to bring transparency to your grocery shopping in Denmark. 
                        We believe everyone deserves to know exactly what they are eating, without needing a degree in nutrition.
                    </p>
                </div>

                <div>
                    <h3 className="font-display font-black text-lg text-evergreen mb-2">How it Works</h3>
                    <p className="text-sm text-evergreen/80 leading-relaxed font-medium">
                        Simply scan any food product to get an instant analysis based on the <strong>Nordic Nutrition Recommendations</strong>. 
                        We break down complex labels into a simple health score, highlight additives, and check for certifications like the <strong>Ø-mærket</strong>.
                    </p>
                </div>

                <div>
                    <h3 className="font-display font-black text-lg text-evergreen mb-2">Why DitMad?</h3>
                    <p className="text-sm text-evergreen/80 leading-relaxed font-medium">
                        Whether you are managing allergies, avoiding certain additives, or just trying to eat healthier, 
                        DitMadKompass acts as your personal digital dietician, suggesting healthier alternatives instantly.
                    </p>
                </div>
            </div>

            <div className="mt-12 opacity-50">
                <p className="text-[10px] text-evergreen font-bold">Designed with care for Denmark.</p>
                <p className="text-[10px] text-evergreen">© 2024 DitMadKompass</p>
            </div>
        </div>
    </div>
  );
};

export default AboutPage;
