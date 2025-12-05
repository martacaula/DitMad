import React from 'react';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="min-h-screen bg-evergreen flex flex-col items-center justify-center text-frostedMint pb-32 animate-fade-in">
        <h1 className="font-display font-black text-4xl mb-4">{title}</h1>
        <p className="text-center opacity-70 px-8">This feature is coming soon to DitMadKompass.</p>
    </div>
  );
};

export default PlaceholderPage;
