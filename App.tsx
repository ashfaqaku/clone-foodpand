import React, { useState, useEffect } from 'react';
import { AppTab } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatLab from './components/ChatLab';
import VisionLab from './components/VisionLab';
import ImageStudio from './components/ImageStudio';
import LiveLab from './components/LiveLab';
import AboutPage from './components/AboutPage';
import PandaAdsPage from './components/PandaAdsPage';

const App: React.FC = () => {
  // Check URL params to see if we should start on a specific tab
  const getInitialTab = (): AppTab => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && Object.values(AppTab).includes(tabParam as AppTab)) {
      return tabParam as AppTab;
    }
    return AppTab.HOME;
  };

  const [activeTab, setActiveTab] = useState<AppTab>(getInitialTab());

  const handleTabChange = (tab: AppTab) => {
    // Note: window.open fails on blob URLs (common in preview environments)
    // We navigate internally but hide the main header to simulate a "new page"
    setActiveTab(tab);
    
    // Update URL without refreshing to support deep linking if the environment allows it
    const url = new URL(window.location.href);
    if (tab === AppTab.HOME) {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', tab);
    }
    window.history.replaceState({}, '', url.toString());
    
    // Smooth scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return <Dashboard onNavigate={handleTabChange} />;
      case AppTab.ABOUT:
        return <AboutPage onNavigate={handleTabChange} />;
      case AppTab.NEWSROOM:
        return <VisionLab />;
      case AppTab.PARTNERS:
        return <ImageStudio />;
      case AppTab.PANDA_ADS:
        // Pass navigate handler so the ads page can return home
        return <PandaAdsPage onNavigate={handleTabChange} />;
      case AppTab.CONTACT:
        return <ChatLab />;
      case AppTab.CAREERS:
        return (
          <div className="max-w-4xl mx-auto p-20 text-center space-y-6">
            <h2 className="text-4xl font-black text-gray-800">Join the Panda Team</h2>
            <p className="text-gray-500">Help us build the future of delivery and AI in the Asia-Pacific region.</p>
            <button className="btn-panda px-12 py-4 rounded-xl font-bold">View Open Positions</button>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleTabChange} />;
    }
  };

  // Determine if we should show the global "Foodpanda" header/footer
  // We hide them for PANDA_ADS to make it feel like a completely different site
  const isAdsMode = activeTab === AppTab.PANDA_ADS;

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdsMode && <Header activeTab={activeTab} onTabChange={handleTabChange} />}
      
      <main className="flex-1">
        {renderContent()}
      </main>
      
      {!isAdsMode && (
        <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-[10%] relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-32">
              {/* Logo Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#ff2b85] rounded-xl p-2 flex items-center justify-center">
                     <i className="fas fa-paw text-white text-xl"></i>
                  </div>
                  <span className="text-[30px] font-black text-white tracking-tight">foodpanda</span>
                </div>
              </div>

              {/* Navigate Column */}
              <div className="space-y-8">
                <h3 className="text-xl font-black text-white tracking-tight">Navigate</h3>
                <ul className="space-y-4">
                  <li><button onClick={() => handleTabChange(AppTab.HOME)} className={`text-white text-lg font-bold hover:text-panda transition-colors ${activeTab === AppTab.HOME ? 'text-panda' : ''}`}>Home</button></li>
                  <li><button onClick={() => handleTabChange(AppTab.ABOUT)} className={`text-white text-lg font-bold hover:text-panda transition-colors ${activeTab === AppTab.ABOUT ? 'text-panda' : ''}`}>About</button></li>
                  <li><button onClick={() => handleTabChange(AppTab.CONTACT)} className={`text-white text-lg font-bold hover:text-panda transition-colors ${activeTab === AppTab.CONTACT ? 'text-panda' : ''}`}>Contact</button></li>
                  <li><button onClick={() => handleTabChange(AppTab.NEWSROOM)} className={`text-white text-lg font-bold hover:text-panda transition-colors ${activeTab === AppTab.NEWSROOM ? 'text-panda' : ''}`}>Newsroom</button></li>
                </ul>
              </div>

              {/* Collaborate Column */}
              <div className="space-y-8">
                <h3 className="text-xl font-black text-white tracking-tight">Collaborate</h3>
                <ul className="space-y-4">
                  <li><button onClick={() => handleTabChange(AppTab.CAREERS)} className="text-white text-lg font-bold hover:text-panda transition-colors">Explore careers</button></li>
                  <li><a href="#" className="text-white text-lg font-bold hover:text-panda transition-colors">Become a rider</a></li>
                  <li><button onClick={() => handleTabChange(AppTab.PARTNERS)} className="text-white text-lg font-bold hover:text-panda transition-colors">Feed your team</button></li>
                </ul>
              </div>

              {/* Follow us Column */}
              <div className="space-y-8">
                <h3 className="text-xl font-black text-white tracking-tight">Follow us on</h3>
                <div className="flex items-center gap-8">
                  <a href="#" className="text-white text-3xl hover:text-panda transition-all transform hover:scale-110">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="text-white text-3xl hover:text-panda transition-all transform hover:scale-110">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="text-white text-3xl hover:text-panda transition-all transform hover:scale-110">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/10">
              <div className="text-white text-sm md:text-base font-bold">
                Copyright © 2025 foodpanda
              </div>
              
              {/* Scroll to Top Arrow (Pink) */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-14 h-12 bg-[#ff2b85] text-white flex items-center justify-center rounded-lg hover:bg-[#e02475] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-panda/20"
              >
                <i className="fas fa-chevron-up text-xl"></i>
              </button>

              <div className="text-white text-sm md:text-base font-bold">
                <a href="#" className="hover:text-panda transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;