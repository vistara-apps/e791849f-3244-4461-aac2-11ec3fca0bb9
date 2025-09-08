'use client';

import { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { User, Settings, Shield, Bell, CreditCard, LogOut, ChevronRight } from 'lucide-react';

interface ProfileViewProps {
  purchasedItems: Set<string>;
}

export function ProfileView({ purchasedItems }: ProfileViewProps) {
  const [notifications, setNotifications] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  const purchasedCount = purchasedItems.size;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="glass-card p-6 rounded-xl text-center">
        <Wallet>
          <div className="space-y-4">
            <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
              <Avatar className="w-16 h-16" />
            </div>
            
            <div className="space-y-2">
              <ConnectWallet>
                <div className="text-lg font-bold text-text-primary">
                  <Name />
                </div>
              </ConnectWallet>
              <p className="text-sm text-text-secondary">RightCheck User</p>
            </div>

            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{purchasedCount}</div>
                <div className="text-xs text-text-secondary">Premium Content</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent">24/7</div>
                <div className="text-xs text-text-secondary">Legal Access</div>
              </div>
            </div>
          </div>
        </Wallet>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        
        <button className="w-full glass-card p-4 rounded-xl flex items-center justify-between hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-text-primary">My Purchases</div>
              <div className="text-sm text-text-secondary">{purchasedCount} premium items</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-text-secondary" />
        </button>

        <button className="w-full glass-card p-4 rounded-xl flex items-center justify-between hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-text-primary">Emergency Contacts</div>
              <div className="text-sm text-text-secondary">Manage your contacts</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Settings</h3>
        
        <div className="glass-card p-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-text-secondary" />
              <div>
                <div className="font-medium text-text-primary">Notifications</div>
                <div className="text-sm text-text-secondary">Get alerts for new content</div>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                notifications ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-text-secondary" />
              <div>
                <div className="font-medium text-text-primary">Emergency Alerts</div>
                <div className="text-sm text-text-secondary">Critical legal updates</div>
              </div>
            </div>
            <button
              onClick={() => setEmergencyAlerts(!emergencyAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                emergencyAlerts ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  emergencyAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <button className="w-full glass-card p-4 rounded-xl flex items-center justify-between hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-text-secondary" />
            </div>
            <div className="text-left">
              <div className="font-medium text-text-primary">App Settings</div>
              <div className="text-sm text-text-secondary">Privacy, security & more</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Support */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Support</h3>
        
        <div className="glass-card p-4 rounded-xl space-y-3">
          <button className="w-full flex items-center justify-between py-2">
            <span className="text-text-primary">Help Center</span>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </button>
          
          <button className="w-full flex items-center justify-between py-2">
            <span className="text-text-primary">Contact Support</span>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </button>
          
          <button className="w-full flex items-center justify-between py-2">
            <span className="text-text-primary">Privacy Policy</span>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </button>
          
          <button className="w-full flex items-center justify-between py-2">
            <span className="text-text-primary">Terms of Service</span>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="glass-card p-4 rounded-xl text-center space-y-2">
        <div className="text-sm text-text-secondary">RightCheck v1.0.0</div>
        <div className="text-xs text-text-secondary">
          Built with ❤️ for legal empowerment
        </div>
      </div>
    </div>
  );
}
