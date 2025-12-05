
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in">
       <header className="px-6 pt-8 pb-4 flex items-center relative">
            <button onClick={onBack} className="absolute left-4 p-2 text-evergreen">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="w-full text-center font-display font-black text-2xl text-evergreen uppercase tracking-wide">
                Contact
            </h1>
        </header>

        <div className="px-6 mt-6 space-y-4">
            <div className="flex flex-col gap-2">
                <label className="font-bold text-evergreen text-sm">Topic</label>
                <select className="bg-gray-50 p-4 rounded-xl font-bold text-evergreen">
                    <option>General Support</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-bold text-evergreen text-sm">Message</label>
                <textarea className="bg-gray-50 p-4 rounded-xl font-bold text-evergreen h-40 resize-none" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-evergreen text-white font-black py-4 rounded-xl shadow-lg mt-4">Send Message</button>
        </div>
    </div>
  );
};

export default ContactPage;
