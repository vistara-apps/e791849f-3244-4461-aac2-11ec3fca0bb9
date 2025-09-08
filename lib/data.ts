import { Checklist, ScenarioGuide, LegalTerm, Alert } from './types';

export const mockChecklists: Checklist[] = [
  {
    id: 'police-stop',
    title: 'Police Traffic Stop',
    description: 'Essential rights and steps during a police traffic stop',
    category: 'Traffic & Police',
    urgency: 'high',
    premium: false,
    tags: ['police', 'traffic', 'rights', 'emergency'],
    steps: [
      {
        id: '1',
        title: 'Stay Calm and Pull Over Safely',
        description: 'Turn on hazard lights, pull to the right side of the road, and turn off your engine.',
        action: 'Keep your hands visible on the steering wheel'
      },
      {
        id: '2',
        title: 'Know Your Rights',
        description: 'You have the right to remain silent beyond providing license, registration, and insurance.',
        warning: 'Do not consent to searches without a warrant'
      },
      {
        id: '3',
        title: 'Be Respectful but Firm',
        description: 'Comply with lawful orders while asserting your rights politely.',
        action: 'Say: "I am exercising my right to remain silent"'
      },
      {
        id: '4',
        title: 'Document the Interaction',
        description: 'Remember badge numbers, patrol car numbers, and details of the stop.',
        action: 'You may record the interaction in most states'
      }
    ]
  },
  {
    id: 'landlord-entry',
    title: 'Landlord Entry Rights',
    description: 'Know your rights when landlords want to enter your rental property',
    category: 'Housing & Tenants',
    urgency: 'medium',
    premium: true,
    price: '0.001',
    tags: ['landlord', 'tenant', 'housing', 'privacy'],
    steps: [
      {
        id: '1',
        title: 'Check Notice Requirements',
        description: 'Most states require 24-48 hours written notice except for emergencies.',
        warning: 'Emergency entry must be for genuine emergencies only'
      },
      {
        id: '2',
        title: 'Valid Reasons for Entry',
        description: 'Repairs, inspections, showing to prospective tenants, or emergencies.',
        action: 'Request specific reason in writing'
      },
      {
        id: '3',
        title: 'Your Right to Refuse',
        description: 'You can refuse entry if proper notice wasn\'t given or reason is invalid.',
        action: 'Document any unauthorized entries'
      }
    ]
  },
  {
    id: 'workplace-discrimination',
    title: 'Workplace Discrimination',
    description: 'Steps to take if you experience workplace discrimination',
    category: 'Employment',
    urgency: 'medium',
    premium: true,
    price: '0.002',
    tags: ['workplace', 'discrimination', 'employment', 'rights'],
    steps: [
      {
        id: '1',
        title: 'Document Everything',
        description: 'Keep detailed records of discriminatory incidents, including dates, witnesses, and evidence.',
        action: 'Save emails, messages, and take notes immediately after incidents'
      },
      {
        id: '2',
        title: 'Report Internally First',
        description: 'Follow your company\'s complaint procedure and report to HR or management.',
        warning: 'Keep copies of all reports and responses'
      },
      {
        id: '3',
        title: 'File External Complaints',
        description: 'Contact EEOC or state civil rights agency if internal resolution fails.',
        action: 'File within 180-300 days depending on your state'
      }
    ]
  }
];

export const mockGuides: ScenarioGuide[] = [
  {
    id: 'job-interview-rights',
    title: 'Job Interview Rights',
    description: 'What employers can and cannot ask during job interviews',
    category: 'Employment',
    premium: false,
    tags: ['job', 'interview', 'employment', 'discrimination'],
    modules: [
      {
        id: '1',
        title: 'Illegal Questions',
        content: 'Employers cannot ask about age, marital status, pregnancy, religion, race, or disability status.',
        interactive: true
      },
      {
        id: '2',
        title: 'How to Respond',
        content: 'You can politely decline to answer or redirect to job-related qualifications.',
        interactive: true
      }
    ]
  },
  {
    id: 'rental-application',
    title: 'Rental Application Process',
    description: 'Your rights during the rental application and screening process',
    category: 'Housing & Tenants',
    premium: true,
    price: '0.0015',
    tags: ['rental', 'housing', 'application', 'screening'],
    modules: [
      {
        id: '1',
        title: 'Application Fees',
        content: 'Understand what fees are legal and what information landlords can request.',
        interactive: false
      },
      {
        id: '2',
        title: 'Credit and Background Checks',
        content: 'Know your rights regarding credit checks and how to dispute incorrect information.',
        interactive: true
      }
    ]
  }
];

export const mockTerms: LegalTerm[] = [
  {
    term: 'Miranda Rights',
    definition: 'Constitutional rights that police must inform suspects of before custodial interrogation, including the right to remain silent and right to an attorney.',
    category: 'Criminal Law',
    relatedGuides: ['police-stop']
  },
  {
    term: 'Probable Cause',
    definition: 'A reasonable basis for believing that a crime may have been committed, required for arrests and search warrants.',
    category: 'Criminal Law',
    relatedGuides: ['police-stop']
  },
  {
    term: 'Quiet Enjoyment',
    definition: 'A tenant\'s right to use their rental property without unreasonable interference from the landlord.',
    category: 'Housing Law',
    relatedGuides: ['landlord-entry', 'rental-application']
  },
  {
    term: 'At-Will Employment',
    definition: 'Employment that can be terminated by either party at any time, with or without cause, except for illegal reasons.',
    category: 'Employment Law',
    relatedGuides: ['workplace-discrimination', 'job-interview-rights']
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'New Tenant Protection Law',
    content: 'New legislation requires 30-day notice for rent increases over 5%. Effective immediately in your state.',
    timestamp: Date.now() - 86400000, // 1 day ago
    readStatus: false,
    urgency: 'medium',
    category: 'Housing & Tenants',
    actionRequired: true
  },
  {
    id: 'alert-2',
    title: 'Police Body Camera Requirements',
    content: 'New state law requires police to activate body cameras during all traffic stops. Know your rights to request footage.',
    timestamp: Date.now() - 172800000, // 2 days ago
    readStatus: false,
    urgency: 'high',
    category: 'Traffic & Police',
    actionRequired: false
  }
];
