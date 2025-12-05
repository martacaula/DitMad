
import React, { useState } from 'react';
import Scanner from './components/Scanner';
import ScannedProductPage from './components/ScannedProductPage';
import ProductDetailPage from './components/ProductDetailPage';
import MyListsPage from './components/MyListsPage';
import HistoryPage from './components/HistoryPage';
import CreateListPage from './components/CreateListPage';
import ListDetailPage from './components/ListDetailPage';
import ProfilePage from './components/ProfilePage';
import SubscriptionPage from './components/SubscriptionPage';
import SettingsPage from './components/SettingsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BottomNav from './components/BottomNav';
import LoadingScreen from './components/LoadingScreen';
import PlaceholderPage from './components/PlaceholderPage';
import { ViewState, ProductAnalysis, HistoryItem, UserList } from './types';

function App() {
  const [view, setView] = useState<ViewState>('home'); 
  const [analysisResult, setAnalysisResult] = useState<ProductAnalysis | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [triggerInput, setTriggerInput] = useState(false);
  
  // Mock Data matching the History image provided
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', brand: 'Jakobsens Organic', productName: 'Grovvalsede Havregryn', numericScore: 80, liked: true, saved: true },
    { id: '2', brand: 'Oatly Barista', productName: 'Oatmilk', numericScore: 65, liked: false, saved: false },
    { id: '3', brand: 'Salling ØKO', productName: 'Oatmeal', numericScore: 82, liked: true, saved: true },
    { id: '4', brand: 'Salling ØKO', productName: 'Mysli', numericScore: 45, liked: false, saved: false },
    { id: '5', brand: 'Bettergoods', productName: 'Plant-Based Oatmilk', numericScore: 70, liked: false, saved: false },
    { id: '6', brand: 'Jakobsens Organic', productName: 'Grovvalsede Havregryn', numericScore: 80, liked: true, saved: true },
    { id: '7', brand: 'Sol Gryn', productName: 'Oatmeal', numericScore: 75, liked: false, saved: false },
    { id: '8', brand: 'Barilla', productName: 'Veggie Rotini', numericScore: 60, liked: false, saved: false },
    { id: '9', brand: 'De Cecco', productName: 'Radiatori', numericScore: 55, liked: false, saved: false },
    { id: '10', brand: 'Planet Oat', productName: 'Oatmilk Vanilla', numericScore: 40, liked: false, saved: false },
    { id: '11', brand: 'De Cecco', productName: 'Fusilli 100% Organic', numericScore: 85, liked: true, saved: false },
  ]);

  const [userLists, setUserLists] = useState<UserList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);

  const handleScanStart = () => {
    setView('loading');
  };

  const handleScanComplete = (analysis: ProductAnalysis, imagePreview: string) => {
    setAnalysisResult(analysis);
    setCurrentImage(imagePreview);
    setView('scanned_product');
    
    // Add to history automatically
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      brand: analysis.brand,
      productName: analysis.productName,
      numericScore: analysis.numericScore,
      liked: false,
      saved: false,
      image: imagePreview
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const handleNavClick = (newView: ViewState) => {
    if (newView === 'home') {
        if (view === 'home') {
             setTriggerInput(true);
        } else {
            setView('home');
        }
    } else {
        setView(newView);
    }
  };

  const navigateToDetail = () => {
      setView('product_detail');
  };

  const handleBack = () => {
      if (view === 'product_detail') {
          setView('scanned_product');
      } else if (view === 'scanned_product') {
          setAnalysisResult(null);
          setCurrentImage('');
          setView('home');
      } else if (view === 'history' || view === 'create_list') {
          setView('my_lists');
      } else if (view === 'list_detail') {
          setView('my_lists');
      } else if (['settings', 'subscription', 'about', 'contact'].includes(view)) {
          setView('profile');
      } else {
          setView('home');
      }
  };

  // List Management
  const createList = (name: string, icon: string) => {
      const newList: UserList = {
          id: Date.now().toString(),
          name,
          icon,
          items: [],
          notes: ''
      };
      setUserLists([...userLists, newList]);
      setActiveListId(newList.id);
      setView('list_detail');
  };

  const openList = (id: string) => {
      setActiveListId(id);
      setView('list_detail');
  };

  const updateList = (updatedList: UserList) => {
      setUserLists(prev => prev.map(l => l.id === updatedList.id ? updatedList : l));
  };

  const activeList = userLists.find(l => l.id === activeListId);

  return (
    <div className="min-h-screen relative font-sans bg-evergreen/5">
      
      {view === 'loading' && <LoadingScreen />}

      {view === 'home' && (
        <Scanner 
          onScanStart={handleScanStart}
          onScanComplete={handleScanComplete}
          triggerInput={triggerInput}
          setTriggerInput={setTriggerInput}
        />
      )}
      
      {view === 'scanned_product' && analysisResult && (
        <ScannedProductPage 
          analysis={analysisResult} 
          imagePreview={currentImage}
          onProductClick={navigateToDetail}
        />
      )}

      {view === 'product_detail' && analysisResult && (
        <ProductDetailPage 
          analysis={analysisResult} 
          imagePreview={currentImage}
          onBack={handleBack}
        />
      )}

      {view === 'my_lists' && (
        <MyListsPage 
            onNavigate={(page) => setView(page)} 
            userLists={userLists}
            onOpenList={openList}
        />
      )}

      {view === 'history' && <HistoryPage history={history} onBack={handleBack} />}
      
      {view === 'create_list' && <CreateListPage onCreate={createList} onCancel={() => setView('my_lists')} />}
      
      {view === 'list_detail' && activeList && (
          <ListDetailPage 
            list={activeList} 
            onUpdate={updateList} 
            onBack={handleBack} 
            allHistory={history}
          />
      )}

      {view === 'profile' && <ProfilePage onNavigate={(page) => setView(page)} />}
      {view === 'subscription' && <SubscriptionPage onBack={handleBack} />}
      {view === 'settings' && <SettingsPage onBack={handleBack} />}
      {view === 'about' && <AboutPage onBack={handleBack} />}
      {view === 'contact' && <ContactPage onBack={handleBack} />}

      {view === 'community' && <PlaceholderPage title="Community" />}
      {view === 'alternatives' && <PlaceholderPage title="Alternatives" />}

      {/* Persistent Navigation */}
      {view !== 'loading' && (
        <BottomNav 
            activeView={view} 
            onNavClick={handleNavClick}
        />
      )}
    </div>
  );
}

export default App;
