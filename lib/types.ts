export interface User {
  farcasterId: string;
  baseWalletAddress: string;
  preferences: UserPreferences;
  purchaseHistory: Purchase[];
}

export interface UserPreferences {
  notifications: boolean;
  categories: string[];
  language: string;
}

export interface Purchase {
  id: string;
  itemId: string;
  itemType: 'checklist' | 'guide';
  amount: string;
  timestamp: number;
  txHash: string;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  steps: ChecklistStep[];
  tags: string[];
  premium: boolean;
  price?: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface ChecklistStep {
  id: string;
  title: string;
  description: string;
  action?: string;
  warning?: string;
  completed?: boolean;
}

export interface ScenarioGuide {
  id: string;
  title: string;
  description: string;
  modules: GuideModule[];
  tags: string[];
  premium: boolean;
  price?: string;
  category: string;
}

export interface GuideModule {
  id: string;
  title: string;
  content: string;
  interactive?: boolean;
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LegalTerm {
  term: string;
  definition: string;
  relatedGuides: string[];
  category: string;
}

export interface Alert {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  readStatus: boolean;
  urgency: 'low' | 'medium' | 'high';
  category: string;
  actionRequired?: boolean;
}

export interface AppState {
  user: User | null;
  checklists: Checklist[];
  guides: ScenarioGuide[];
  terms: LegalTerm[];
  alerts: Alert[];
  purchasedItems: string[];
}
