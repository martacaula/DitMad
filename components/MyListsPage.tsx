
import React from 'react';
import { ArrowLeftIcon, BookmarkIcon, HeartIcon, ClipboardDocumentListIcon, PlusIcon } from '@heroicons/react/24/solid';
import { UserList, ViewState } from '../types';

interface MyListsPageProps {
  onNavigate: (view: ViewState) => void;
  userLists: UserList[];
  onOpenList: (id: string) => void;
}

const MyListsPage: React.FC<MyListsPageProps> = ({ onNavigate, userLists, onOpenList }) => {
  return (
    <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in flex flex-col">
        {/* Header */}
        <header className="px-6 pt-8 pb-4 flex items-center justify-center relative">
            <button className="absolute left-4 p-2 text-evergreen">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="font-display font-black text-3xl text-evergreen uppercase tracking-wide">
                My Lists
            </h1>
        </header>

        <div className="flex-1 px-4 space-y-4 mt-4 overflow-y-auto">
            
            {/* History Card */}
            <div 
                onClick={() => onNavigate('history')}
                className="bg-[#E8F7EA] rounded-[2rem] p-8 flex items-center gap-6 cursor-pointer hover:bg-[#D6F9DD] transition-colors h-32"
            >
                <div className="text-evergreen">
                    <ClipboardDocumentListIcon className="w-8 h-8" />
                </div>
                <span className="font-display font-black text-xl text-evergreen">History</span>
            </div>

            {/* Favourites Card */}
            <div className="bg-[#E8F7EA] rounded-[2rem] p-8 flex items-center gap-6 cursor-pointer hover:bg-[#D6F9DD] transition-colors h-32">
                <div className="text-evergreen">
                    <HeartIcon className="w-8 h-8" />
                </div>
                <span className="font-display font-black text-xl text-evergreen">Favourites</span>
            </div>

             {/* Saved Card */}
             <div className="bg-[#E8F7EA] rounded-[2rem] p-8 flex items-center gap-6 cursor-pointer hover:bg-[#D6F9DD] transition-colors h-32">
                <div className="text-evergreen">
                    <BookmarkIcon className="w-8 h-8" />
                </div>
                <span className="font-display font-black text-xl text-evergreen">Saved</span>
            </div>

            {/* Custom Lists Rendered Here */}
            {userLists.map((list) => (
                 <div 
                    key={list.id}
                    onClick={() => onOpenList(list.id)}
                    className="bg-[#E8F7EA] rounded-[2rem] p-8 flex items-center gap-6 cursor-pointer hover:bg-[#D6F9DD] transition-colors h-32"
                >
                    <div className="text-2xl w-8 text-center">
                        {list.icon}
                    </div>
                    <span className="font-display font-black text-xl text-evergreen">{list.name}</span>
                </div>
            ))}

            {/* New List Card - Dark */}
            <div 
                onClick={() => onNavigate('create_list')}
                className="bg-evergreen rounded-[2rem] p-8 flex items-center gap-6 cursor-pointer shadow-lg mt-8 h-32"
            >
                <div className="text-white">
                    <PlusIcon className="w-8 h-8" />
                </div>
                <span className="font-display font-black text-xl text-white">New List</span>
            </div>

        </div>
    </div>
  );
};

export default MyListsPage;
