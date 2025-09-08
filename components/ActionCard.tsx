'use client';

import { ReactNode } from 'react';
import { Lock, Clock, AlertTriangle, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, getUrgencyColor, getCategoryIcon, formatTimestamp } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

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
  itemId?: string;
  showFavorite?: boolean;
  progress?: number;
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
  className,
  itemId,
  showFavorite = false,
  progress
}: ActionCardProps) {
  const urgencyStyles = getUrgencyColor(urgency);
  const categoryIcon = category ? getCategoryIcon(category) : '📋';
  
  const { toggleFavorite, isFavorite, isPurchased } = useAppStore();
  const isItemFavorite = itemId ? isFavorite(itemId) : false;
  const isItemPurchased = itemId ? isPurchased(itemId) : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (itemId) {
      toggleFavorite(itemId);
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'action-card relative overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
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
          {showFavorite && itemId && (
            <motion.button
              onClick={handleFavoriteClick}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart 
                className={cn(
                  'w-4 h-4 transition-colors',
                  isItemFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                )}
              />
            </motion.button>
          )}
          
          {premium && !isItemPurchased && (
            <div className="flex items-center space-x-1 bg-accent bg-opacity-10 text-accent px-2 py-1 rounded-md">
              <Lock className="w-3 h-3" />
              <span className="text-xs font-medium">{price} ETH</span>
            </div>
          )}
          
          {premium && isItemPurchased && (
            <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-md">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">Owned</span>
            </div>
          )}
          
          {variant === 'alert' && (
            <div className={cn('px-2 py-1 rounded-md text-xs font-medium border', urgencyStyles)}>
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
        
        {/* Progress bar for checklists */}
        {progress !== undefined && progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          {variant === 'alert' && timestamp && (
            <div className="flex items-center space-x-1 text-text-secondary">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {formatTimestamp(timestamp)}
              </span>
            </div>
          )}
          
          {actionRequired && (
            <motion.div 
              className="flex items-center space-x-1 text-red-600"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Action Required</span>
            </motion.div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {variant === 'checklist' && (
            <div className="text-primary text-sm font-medium hover:text-accent transition-colors">
              {progress === 100 ? 'Review ✓' : 'View Checklist →'}
            </div>
          )}
          
          {variant === 'guide' && (
            <div className="text-primary text-sm font-medium hover:text-accent transition-colors">
              Start Guide →
            </div>
          )}
          
          {variant === 'alert' && (
            <div className="text-primary text-sm font-medium hover:text-accent transition-colors">
              View Details →
            </div>
          )}
        </div>
      </div>
      
      {/* Gradient overlay for premium items */}
      {premium && !isItemPurchased && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-accent/5 pointer-events-none" />
      )}
    </motion.div>
  );
}
