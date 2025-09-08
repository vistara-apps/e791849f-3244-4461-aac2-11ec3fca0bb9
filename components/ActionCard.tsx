'use client';

import { ReactNode } from 'react';
import { Lock, Clock, AlertTriangle } from 'lucide-react';
import { cn, getUrgencyColor, getCategoryIcon } from '@/lib/utils';

interface ActionCardProps {
  variant: 'checklist' | 'alert' | 'guide';
  title: string;
  description: string;
  category?: string;
  urgency?: 'low' | 'medium' | 'high';
  premium?: boolean;
  price?: string;
  timestamp?: number;
  actionRequired?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ActionCard({
  variant,
  title,
  description,
  category,
  urgency = 'low',
  premium = false,
  price,
  timestamp,
  actionRequired = false,
  onClick,
  className
}: ActionCardProps) {
  const urgencyStyles = getUrgencyColor(urgency);
  const categoryIcon = category ? getCategoryIcon(category) : '📋';

  return (
    <div
      onClick={onClick}
      className={cn(
        'action-card animate-fade-in',
        onClick && 'hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{categoryIcon}</span>
          {category && (
            <span className="text-sm text-text-secondary font-medium">{category}</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {premium && (
            <div className="flex items-center space-x-1 bg-accent bg-opacity-10 text-accent px-2 py-1 rounded-md">
              <Lock className="w-3 h-3" />
              <span className="text-xs font-medium">{price} ETH</span>
            </div>
          )}
          
          {variant === 'alert' && (
            <div className={cn('px-2 py-1 rounded-md text-xs font-medium', urgencyStyles)}>
              {urgency.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary leading-tight">
          {title}
        </h3>
        <p className="text-base leading-6 text-text-secondary">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        {variant === 'alert' && timestamp && (
          <div className="flex items-center space-x-1 text-text-secondary">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {new Date(timestamp).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {actionRequired && (
          <div className="flex items-center space-x-1 text-red-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Action Required</span>
          </div>
        )}
        
        {variant === 'checklist' && (
          <div className="text-primary text-sm font-medium">
            View Checklist →
          </div>
        )}
        
        {variant === 'guide' && (
          <div className="text-primary text-sm font-medium">
            Start Guide →
          </div>
        )}
      </div>
    </div>
  );
}
