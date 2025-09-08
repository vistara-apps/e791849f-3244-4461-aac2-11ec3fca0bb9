import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { parseEther } from 'viem';
import { User, Purchase } from './types';

// Base MiniKit API service
export class MiniKitService {
  private static instance: MiniKitService;
  
  static getInstance(): MiniKitService {
    if (!MiniKitService.instance) {
      MiniKitService.instance = new MiniKitService();
    }
    return MiniKitService.instance;
  }

  // Purchase premium content using Base MiniKit
  async purchaseContent(itemId: string, price: string, title: string): Promise<Purchase> {
    try {
      // This would integrate with Base MiniKit for actual transactions
      // For now, we'll simulate the transaction
      const txHash = await this.simulateTransaction(price);
      
      const purchase: Purchase = {
        id: `purchase_${Date.now()}`,
        itemId,
        itemType: 'checklist', // or 'guide'
        amount: price,
        timestamp: Date.now(),
        txHash,
      };

      return purchase;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw new Error('Transaction failed. Please try again.');
    }
  }

  // Simulate transaction for demo purposes
  private async simulateTransaction(amount: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock transaction hash
    const txHash = '0x' + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    return txHash;
  }

  // Get user's Base wallet address
  async getWalletAddress(): Promise<string | null> {
    try {
      // This would use actual MiniKit API
      // For now, return a mock address
      return '0x742d35Cc6634C0532925a3b8D0C9e3e0C8b0e4c2';
    } catch (error) {
      console.error('Failed to get wallet address:', error);
      return null;
    }
  }

  // Check if user has sufficient balance
  async checkBalance(requiredAmount: string): Promise<boolean> {
    try {
      // This would check actual wallet balance
      // For demo, always return true
      return true;
    } catch (error) {
      console.error('Failed to check balance:', error);
      return false;
    }
  }

  // Send notification through Base wallet
  async sendNotification(title: string, message: string): Promise<boolean> {
    try {
      // This would use Base MiniKit notification API
      console.log('Notification sent:', { title, message });
      return true;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }
}

// Farcaster integration service
export class FarcasterService {
  private static instance: FarcasterService;
  
  static getInstance(): FarcasterService {
    if (!FarcasterService.instance) {
      FarcasterService.instance = new FarcasterService();
    }
    return FarcasterService.instance;
  }

  // Get user profile from Farcaster
  async getUserProfile(fid: string): Promise<Partial<User> | null> {
    try {
      // This would integrate with Farcaster Hub API
      // For now, return mock data
      return {
        farcasterId: fid,
        baseWalletAddress: '0x742d35Cc6634C0532925a3b8D0C9e3e0C8b0e4c2',
        preferences: {
          notifications: true,
          categories: [],
          language: 'en',
        },
        purchaseHistory: [],
      };
    } catch (error) {
      console.error('Failed to get Farcaster profile:', error);
      return null;
    }
  }

  // Share checklist completion on Farcaster
  async shareCompletion(checklistTitle: string): Promise<boolean> {
    try {
      // This would create a cast on Farcaster
      const message = `Just completed "${checklistTitle}" on RightCheck! 🛡️ Know your rights, stay protected. #RightCheck #LegalRights`;
      console.log('Sharing on Farcaster:', message);
      return true;
    } catch (error) {
      console.error('Failed to share on Farcaster:', error);
      return false;
    }
  }
}

// Analytics service for tracking user interactions
export class AnalyticsService {
  private static instance: AnalyticsService;
  
  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Track checklist view
  trackChecklistView(checklistId: string, category: string): void {
    this.track('checklist_viewed', {
      checklist_id: checklistId,
      category,
      timestamp: Date.now(),
    });
  }

  // Track step completion
  trackStepCompletion(checklistId: string, stepId: string): void {
    this.track('step_completed', {
      checklist_id: checklistId,
      step_id: stepId,
      timestamp: Date.now(),
    });
  }

  // Track purchase
  trackPurchase(itemId: string, amount: string, itemType: string): void {
    this.track('purchase_completed', {
      item_id: itemId,
      amount,
      item_type: itemType,
      timestamp: Date.now(),
    });
  }

  // Track search
  trackSearch(query: string, resultsCount: number): void {
    this.track('search_performed', {
      query,
      results_count: resultsCount,
      timestamp: Date.now(),
    });
  }

  // Track alert interaction
  trackAlertInteraction(alertId: string, action: 'viewed' | 'dismissed' | 'acted'): void {
    this.track('alert_interaction', {
      alert_id: alertId,
      action,
      timestamp: Date.now(),
    });
  }

  private track(event: string, properties: Record<string, any>): void {
    // In production, this would send to analytics service
    console.log('Analytics:', event, properties);
    
    // Store locally for demo
    const analytics = JSON.parse(localStorage.getItem('rightcheck_analytics') || '[]');
    analytics.push({ event, properties });
    localStorage.setItem('rightcheck_analytics', JSON.stringify(analytics.slice(-100))); // Keep last 100 events
  }
}

// Notification service
export class NotificationService {
  private static instance: NotificationService;
  
  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Request notification permission
  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  // Send local notification
  async sendNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    const hasPermission = await this.requestPermission();
    
    if (hasPermission) {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });
    }
  }

  // Schedule notification for legal updates
  scheduleAlertNotification(title: string, message: string, delay: number = 0): void {
    setTimeout(() => {
      this.sendNotification(title, {
        body: message,
        tag: 'legal-alert',
        requireInteraction: true,
      });
    }, delay);
  }
}

// Export service instances
export const miniKitService = MiniKitService.getInstance();
export const farcasterService = FarcasterService.getInstance();
export const analyticsService = AnalyticsService.getInstance();
export const notificationService = NotificationService.getInstance();
