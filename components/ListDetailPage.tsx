
import React, { useState } from 'react';
import { ArrowLeftIcon, ShareIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { UserList, HistoryItem } from '../types';

interface ListDetailPageProps {
    list: UserList;
    onUpdate: (list: UserList) => void;
    onBack: () => void;
    allHistory: HistoryItem[];
}

const ListDetailPage: React.FC<ListDetailPageProps> = ({ list, onUpdate, onBack, allHistory }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const toggleItem = (item: HistoryItem) => {
        const exists = list.items.find(i => i.id === item.id);
        let newItems;
        if (exists) {
            newItems = list.items.filter(i => i.id !== item.id);
        } else {
            newItems = [...list.items, item];
        }
        onUpdate({ ...list, items: newItems });
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onUpdate({ ...list, notes: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white pb-32 font-sans animate-fade-in relative">
            {/* Header */}
            <header className="px-6 pt-8 pb-4 flex items-center justify-between">
                <button onClick={onBack} className="p-2 -ml-2 text-evergreen">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{list.icon}</span>
                    <span className="font-display font-black text-xl text-evergreen uppercase">{list.name}</span>
                </div>
                <button className="p-2 -mr-2 text-evergreen">
                    <ShareIcon className="w-6 h-6" />
                </button>
            </header>

            <div className="px-6 mt-4 flex flex-col gap-6">
                
                {/* List Items */}
                <div className="space-y-3">
                    {list.items.length === 0 && (
                        <p className="text-center text-evergreen/50 text-sm py-4 italic">No items yet. Add from history.</p>
                    )}
                    {list.items.map((item) => (
                         <div key={item.id} className="bg-[#E8F7EA] rounded-2xl p-4 flex items-center gap-4">
                            <div className="w-10 h-12 bg-white rounded flex-shrink-0"></div>
                            <div className="flex flex-col">
                                <span className="font-bold text-evergreen text-sm">{item.brand}</span>
                                <span className="text-[10px] text-evergreen/60">{item.productName}</span>
                            </div>
                         </div>
                    ))}
                </div>

                {/* Add Button */}
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full border-2 border-dashed border-evergreen/30 rounded-2xl p-4 flex items-center justify-center gap-2 text-evergreen font-bold hover:bg-[#E8F7EA] transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Items from History</span>
                </button>

                {/* Notes */}
                <div>
                    <h3 className="font-display font-black text-lg text-evergreen mb-2">Notes</h3>
                    <textarea 
                        value={list.notes}
                        onChange={handleNoteChange}
                        placeholder="Add unscanned items or notes here..."
                        className="w-full h-40 bg-[#F5FBF6] rounded-2xl p-4 text-evergreen placeholder-evergreen/40 focus:outline-none focus:ring-1 focus:ring-evergreen/20 resize-none"
                    />
                </div>
            </div>

            {/* Add Items Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
                    <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl h-[80vh] flex flex-col shadow-2xl animate-fade-in">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="font-display font-black text-xl text-evergreen">Add from History</h3>
                            <button onClick={() => setIsAddModalOpen(false)}>
                                <XMarkIcon className="w-6 h-6 text-evergreen" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                             {allHistory.map((item) => {
                                 const isSelected = list.items.some(i => i.id === item.id);
                                 return (
                                    <div 
                                        key={item.id} 
                                        onClick={() => toggleItem(item)}
                                        className={`rounded-2xl p-3 flex items-center justify-between cursor-pointer border-2 transition-colors
                                            ${isSelected ? 'bg-[#D6F9DD] border-evergreen' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                             <div className="w-10 h-10 bg-gray-100 rounded"></div>
                                             <div>
                                                 <p className="text-sm font-bold text-evergreen">{item.brand}</p>
                                                 <p className="text-xs text-evergreen/60">{item.productName}</p>
                                             </div>
                                        </div>
                                        {isSelected && <div className="w-4 h-4 bg-evergreen rounded-full"></div>}
                                    </div>
                                 );
                             })}
                        </div>
                        <div className="p-6 border-t">
                             <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="w-full bg-evergreen text-white font-bold py-3 rounded-xl"
                             >
                                 Done
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListDetailPage;
