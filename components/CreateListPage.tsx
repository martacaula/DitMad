
import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface CreateListPageProps {
    onCreate: (name: string, icon: string) => void;
    onCancel: () => void;
}

const CreateListPage: React.FC<CreateListPageProps> = ({ onCreate, onCancel }) => {
    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('🛒');

    const icons = ['🛒', '🎉', '🍎', '🎂', '💊', '🍷', '🍖', '🥗'];

    return (
        <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in flex flex-col">
             <header className="px-6 pt-8 pb-4 flex items-center relative">
                <button onClick={onCancel} className="absolute left-4 p-2 text-evergreen">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="w-full text-center font-display font-black text-2xl text-evergreen uppercase tracking-wide">
                    New List
                </h1>
            </header>

            <div className="px-8 mt-8 flex flex-col gap-6">
                <div>
                    <label className="block text-evergreen font-bold text-sm mb-2">List Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Birthday Party"
                        className="w-full bg-[#E8F7EA] rounded-xl p-4 text-evergreen font-bold focus:outline-none focus:ring-2 focus:ring-evergreen/20"
                    />
                </div>

                <div>
                    <label className="block text-evergreen font-bold text-sm mb-2">Select Icon</label>
                    <div className="flex gap-4 flex-wrap">
                        {icons.map(icon => (
                            <button 
                                key={icon}
                                onClick={() => setSelectedIcon(icon)}
                                className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all
                                    ${selectedIcon === icon ? 'bg-evergreen text-white scale-110' : 'bg-[#E8F7EA] text-black hover:bg-[#D6F9DD]'}`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    disabled={!name.trim()}
                    onClick={() => onCreate(name, selectedIcon)}
                    className="mt-8 bg-evergreen text-white font-black text-xl rounded-2xl py-4 shadow-lg disabled:opacity-50"
                >
                    Create List
                </button>
            </div>
        </div>
    );
};

export default CreateListPage;
