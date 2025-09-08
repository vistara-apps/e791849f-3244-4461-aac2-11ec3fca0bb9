import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Checklist, ScenarioGuide, LegalTerm, Alert } from './types';

interface AppStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Purchased items
  purchasedItems: Set<string>;
  addPurchasedItem: (itemId: string) => void;
  isPurchased: (itemId: string) => boolean;
  
  // Favorites
  favoriteItems: Set<string>;
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  
  // Completed checklists
  completedSteps: Record<string, Set<string>>;
  toggleStepCompletion: (checklistId: string, stepId: string) => void;
  isStepCompleted: (checklistId: string, stepId: string) => boolean;
  getChecklistProgress: (checklistId: string, totalSteps: number) => number;
  
  // Alerts
  readAlerts: Set<string>;
  markAlertAsRead: (alertId: string) => void;
  isAlertRead: (alertId: string) => boolean;
  getUnreadAlertsCount: (alerts: Alert[]) => number;
  
  // Search history
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  
  // App preferences
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    categories: string[];
  };
  updatePreferences: (preferences: Partial<AppStore['preferences']>) => void;
  
  // Reset store
  reset: () => void;
}

const initialState = {
  user: null,
  purchasedItems: new Set<string>(),
  favoriteItems: new Set<string>(),
  completedSteps: {},
  readAlerts: new Set<string>(),
  searchHistory: [],
  preferences: {
    notifications: true,
    darkMode: false,
    language: 'en',
    categories: [],
  },
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setUser: (user) => set({ user }),
      
      addPurchasedItem: (itemId) =>
        set((state) => ({
          purchasedItems: new Set([...state.purchasedItems, itemId]),
        })),
      
      isPurchased: (itemId) => get().purchasedItems.has(itemId),
      
      toggleFavorite: (itemId) =>
        set((state) => {
          const newFavorites = new Set(state.favoriteItems);
          if (newFavorites.has(itemId)) {
            newFavorites.delete(itemId);
          } else {
            newFavorites.add(itemId);
          }
          return { favoriteItems: newFavorites };
        }),
      
      isFavorite: (itemId) => get().favoriteItems.has(itemId),
      
      toggleStepCompletion: (checklistId, stepId) =>
        set((state) => {
          const newCompletedSteps = { ...state.completedSteps };
          if (!newCompletedSteps[checklistId]) {
            newCompletedSteps[checklistId] = new Set();
          }
          
          const checklistSteps = newCompletedSteps[checklistId];
          if (checklistSteps.has(stepId)) {
            checklistSteps.delete(stepId);
          } else {
            checklistSteps.add(stepId);
          }
          
          return { completedSteps: newCompletedSteps };
        }),
      
      isStepCompleted: (checklistId, stepId) => {
        const completedSteps = get().completedSteps[checklistId];
        return completedSteps ? completedSteps.has(stepId) : false;
      },
      
      getChecklistProgress: (checklistId, totalSteps) => {
        const completedSteps = get().completedSteps[checklistId];
        if (!completedSteps || totalSteps === 0) return 0;
        return Math.round((completedSteps.size / totalSteps) * 100);
      },
      
      markAlertAsRead: (alertId) =>
        set((state) => ({
          readAlerts: new Set([...state.readAlerts, alertId]),
        })),
      
      isAlertRead: (alertId) => get().readAlerts.has(alertId),
      
      getUnreadAlertsCount: (alerts) => {
        const readAlerts = get().readAlerts;
        return alerts.filter((alert) => !readAlerts.has(alert.id)).length;
      },
      
      addToSearchHistory: (query) =>
        set((state) => {
          const trimmedQuery = query.trim();
          if (!trimmedQuery) return state;
          
          const newHistory = [
            trimmedQuery,
            ...state.searchHistory.filter((item) => item !== trimmedQuery),
          ].slice(0, 10); // Keep only last 10 searches
          
          return { searchHistory: newHistory };
        }),
      
      clearSearchHistory: () => set({ searchHistory: [] }),
      
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      
      reset: () => set(initialState),
    }),
    {
      name: 'rightcheck-storage',
      // Convert Sets to Arrays for serialization
      serialize: (state) => {
        const serializedState = {
          ...state.state,
          purchasedItems: Array.from(state.state.purchasedItems),
          favoriteItems: Array.from(state.state.favoriteItems),
          readAlerts: Array.from(state.state.readAlerts),
          completedSteps: Object.fromEntries(
            Object.entries(state.state.completedSteps).map(([key, value]) => [
              key,
              Array.from(value),
            ])
          ),
        };
        return JSON.stringify(serializedState);
      },
      // Convert Arrays back to Sets during deserialization
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          ...parsed,
          purchasedItems: new Set(parsed.purchasedItems || []),
          favoriteItems: new Set(parsed.favoriteItems || []),
          readAlerts: new Set(parsed.readAlerts || []),
          completedSteps: Object.fromEntries(
            Object.entries(parsed.completedSteps || {}).map(([key, value]) => [
              key,
              new Set(value as string[]),
            ])
          ),
        };
      },
    }
  )
);

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user);
export const usePurchasedItems = () => useAppStore((state) => state.purchasedItems);
export const useFavoriteItems = () => useAppStore((state) => state.favoriteItems);
export const usePreferences = () => useAppStore((state) => state.preferences);
