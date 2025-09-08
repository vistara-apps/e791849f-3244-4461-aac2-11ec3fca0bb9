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
        'action-card animate-fade-in group',
        onClick && 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
        urgency === 'high' && 'ring-2 ring-red-200 ring-opacity-50',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center">
            <span className="text-xl">{categoryIcon}</span>
          </div>
          <div className="flex flex-col">
            {category && (
              <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
                {category}
              </span>
            )}
            {urgency === 'high' && variant === 'checklist' && (
              <span className="text-xs text-red-600 font-medium">Emergency</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {premium && (
            <div className="flex items-center space-x-1 bg-gradient-to-r from-accent to-purple-600 text-white px-3 py-1.5 rounded-full shadow-sm">
              <Lock className="w-3 h-3" />
              <span className="text-xs font-semibold">{price} ETH</span>
            </div>
          )}
          
          {variant === 'alert' && (
            <div className={cn('px-3 py-1.5 rounded-full text-xs font-semibold', urgencyStyles)}>
              {urgency.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-4">
        <h3 className="text-xl font-bold text-text-primary leading-tight group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          {variant === 'alert' && timestamp && (
            <div className="flex items-center space-x-1 text-text-secondary">
              <Clock className="w-4 h-4" />
              <span className="text-xs">
                {new Date(timestamp).toLocaleDateString()}
              </span>
            </div>
          )}
          
          {actionRequired && (
            <div className="flex items-center space-x-1 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-medium">Action Required</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {variant === 'checklist' && (
            <div className="text-primary text-sm font-semibold group-hover:text-accent transition-colors duration-200">
              View Checklist →
            </div>
          )}
          
          {variant === 'guide' && (
            <div className="text-primary text-sm font-semibold group-hover:text-accent transition-colors duration-200">
              Start Guide →
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
