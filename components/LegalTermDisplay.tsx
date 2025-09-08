'use client';

import { BookOpen, ExternalLink } from 'lucide-react';
import { LegalTerm } from '@/lib/types';
import { getCategoryIcon } from '@/lib/utils';

interface LegalTermDisplayProps {
  term: LegalTerm;
  onRelatedGuideClick?: (guideId: string) => void;
}

export function LegalTermDisplay({ term, onRelatedGuideClick }: LegalTermDisplayProps) {
  const categoryIcon = getCategoryIcon(term.category);

  return (
    <div className="glass-card p-4 rounded-lg shadow-card animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{categoryIcon}</span>
          <span className="text-sm text-text-secondary font-medium">{term.category}</span>
        </div>
        <BookOpen className="w-5 h-5 text-primary" />
      </div>

      {/* Term */}
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {term.term}
      </h3>

      {/* Definition */}
      <p className="text-base leading-6 text-text-secondary mb-4">
        {term.definition}
      </p>

      {/* Related Guides */}
      {term.relatedGuides.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          <h4 className="text-sm font-medium text-text-primary mb-2">Related Guides:</h4>
          <div className="space-y-1">
            {term.relatedGuides.map((guideId) => (
              <button
                key={guideId}
                onClick={() => onRelatedGuideClick?.(guideId)}
                className="flex items-center space-x-2 text-sm text-primary hover:text-accent transition-colors duration-200"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="capitalize">{guideId.replace('-', ' ')}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
