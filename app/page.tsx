'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { AppShell } from '@/components/AppShell';
import { ActionCard } from '@/components/ActionCard';
import { SearchInput } from '@/components/SearchInput';
import { ChecklistView } from '@/components/ChecklistView';
import { LegalTermDisplay } from '@/components/LegalTermDisplay';
import { PurchaseModal } from '@/components/PurchaseModal';
import { mockChecklists, mockGuides, mockTerms, mockAlerts } from '@/lib/data';
import { Checklist, ScenarioGuide, LegalTerm, Alert } from '@/lib/types';
import { Shield, Zap, BookOpen, Bell } from 'lucide-react';

type ViewMode = 'home' | 'checklist' | 'search' | 'alerts' | 'profile';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTerms, setFilteredTerms] = useState<LegalTerm[]>([]);
  const [purchaseModal, setPurchaseModal] = useState<{
    isOpen: boolean;
    item: Checklist | ScenarioGuide | null;
  }>({ isOpen: false, item: null });
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockTerms.filter(
        term =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTerms(filtered);
    } else {
      setFilteredTerms([]);
    }
  }, [searchQuery]);

  const handleChecklistClick = (checklist: Checklist) => {
    if (checklist.premium && !purchasedItems.has(checklist.id)) {
      setPurchaseModal({ isOpen: true, item: checklist });
    } else {
      setSelectedChecklist(checklist);
      setCurrentView('checklist');
    }
  };

  const handlePurchase = async () => {
    if (!purchaseModal.item) return;
    
    // Simulate purchase transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPurchasedItems(prev => new Set([...prev, purchaseModal.item!.id]));
    setPurchaseModal({ isOpen: false, item: null });
    
    if (purchaseModal.item && 'steps' in purchaseModal.item) {
      setSelectedChecklist(purchaseModal.item);
      setCurrentView('checklist');
    }
  };

  const renderHome = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-6">
        <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Know Your Rights, Instantly</h1>
          <p className="text-base text-text-secondary">
            On-demand legal checklists and emergency rights alerts for common life situations.
          </p>
        </div>
        
        <Wallet>
          <ConnectWallet>
            <Name />
          </ConnectWallet>
        </Wallet>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Zap className="w-5 h-5 text-accent" />
          <span>Emergency Checklists</span>
        </h2>
        
        {mockChecklists
          .filter(checklist => checklist.urgency === 'high')
          .map(checklist => (
            <ActionCard
              key={checklist.id}
              variant="checklist"
              title={checklist.title}
              description={checklist.description}
              category={checklist.category}
              urgency={checklist.urgency}
              premium={checklist.premium}
              price={checklist.price}
              onClick={() => handleChecklistClick(checklist)}
            />
          ))}
      </div>

      {/* Recent Alerts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Bell className="w-5 h-5 text-red-500" />
          <span>Recent Alerts</span>
        </h2>
        
        {mockAlerts.slice(0, 2).map(alert => (
          <ActionCard
            key={alert.id}
            variant="alert"
            title={alert.title}
            description={alert.content}
            category={alert.category}
            urgency={alert.urgency}
            timestamp={alert.timestamp}
            actionRequired={alert.actionRequired}
            onClick={() => setCurrentView('alerts')}
          />
        ))}
      </div>

      {/* All Checklists */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span>All Checklists</span>
        </h2>
        
        {mockChecklists.map(checklist => (
          <ActionCard
            key={checklist.id}
            variant="checklist"
            title={checklist.title}
            description={checklist.description}
            category={checklist.category}
            urgency={checklist.urgency}
            premium={checklist.premium}
            price={checklist.price}
            onClick={() => handleChecklistClick(checklist)}
          />
        ))}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-6">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />
      
      {searchQuery.trim() && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Legal Terms ({filteredTerms.length})
          </h2>
          
          {filteredTerms.length > 0 ? (
            filteredTerms.map(term => (
              <LegalTermDisplay
                key={term.term}
                term={term}
                onRelatedGuideClick={(guideId) => {
                  const checklist = mockChecklists.find(c => c.id === guideId);
                  if (checklist) {
                    handleChecklistClick(checklist);
                  }
                }}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary">No terms found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
      
      {!searchQuery.trim() && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">Browse Categories</h2>
          
          {['Criminal Law', 'Housing Law', 'Employment Law'].map(category => (
            <div key={category} className="glass-card p-4 rounded-lg shadow-card">
              <h3 className="font-semibold text-text-primary mb-2">{category}</h3>
              <div className="space-y-1">
                {mockTerms
                  .filter(term => term.category === category)
                  .slice(0, 3)
                  .map(term => (
                    <button
                      key={term.term}
                      onClick={() => setSearchQuery(term.term)}
                      className="block text-sm text-primary hover:text-accent transition-colors duration-200"
                    >
                      {term.term}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">Emergency Alerts</h2>
      
      {mockAlerts.map(alert => (
        <ActionCard
          key={alert.id}
          variant="alert"
          title={alert.title}
          description={alert.content}
          category={alert.category}
          urgency={alert.urgency}
          timestamp={alert.timestamp}
          actionRequired={alert.actionRequired}
        />
      ))}
    </div>
  );

  const getTitle = () => {
    switch (currentView) {
      case 'checklist':
        return selectedChecklist?.title || 'Checklist';
      case 'search':
        return 'Search';
      case 'alerts':
        return 'Alerts';
      case 'profile':
        return 'Profile';
      default:
        return 'RightCheck';
    }
  };

  const getContent = () => {
    switch (currentView) {
      case 'checklist':
        return selectedChecklist ? (
          <ChecklistView
            checklist={selectedChecklist}
            onBack={() => {
              setCurrentView('home');
              setSelectedChecklist(null);
            }}
            onPurchase={() => setPurchaseModal({ isOpen: true, item: selectedChecklist })}
          />
        ) : null;
      case 'search':
        return renderSearch();
      case 'alerts':
        return renderAlerts();
      case 'profile':
        return (
          <div className="text-center py-8">
            <p className="text-text-secondary">Profile features coming soon!</p>
          </div>
        );
      default:
        return renderHome();
    }
  };

  return (
    <>
      <AppShell
        title={getTitle()}
        showBack={currentView !== 'home'}
        onBack={() => {
          setCurrentView('home');
          setSelectedChecklist(null);
        }}
      >
        {getContent()}
      </AppShell>

      <PurchaseModal
        isOpen={purchaseModal.isOpen}
        onClose={() => setPurchaseModal({ isOpen: false, item: null })}
        onConfirm={handlePurchase}
        title={purchaseModal.item?.title || ''}
        price={purchaseModal.item?.price || '0'}
        description={purchaseModal.item?.description || ''}
      />

      {/* Bottom Navigation Override */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200">
        <div className="px-4 py-2 max-w-sm mx-auto">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors duration-200 ${
                currentView === 'home' ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setCurrentView('search')}
              className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors duration-200 ${
                currentView === 'search' ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Search</span>
            </button>
            <button
              onClick={() => setCurrentView('alerts')}
              className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors duration-200 relative ${
                currentView === 'alerts' ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="text-xs">Alerts</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors duration-200 ${
                currentView === 'profile' ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
            >
              <Wallet>
                <ConnectWallet>
                  <Name />
                </ConnectWallet>
              </Wallet>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
