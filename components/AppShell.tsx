'use client';

import { ReactNode } from 'react';
import { Shield, Bell, Search, User } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function AppShell({ children, title = 'RightCheck', showBack = false, onBack }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 max-w-sm mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {showBack && (
                <button
                  onClick={onBack}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-primary" />
                <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 relative">
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
                <User className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-sm mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200">
        <div className="px-4 py-2 max-w-sm mx-auto">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-primary">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-medium">Checklists</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-text-secondary hover:text-primary transition-colors duration-200">
              <Search className="w-5 h-5" />
              <span className="text-xs">Search</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-text-secondary hover:text-primary transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="text-xs">Alerts</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-text-secondary hover:text-primary transition-colors duration-200">
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
}
