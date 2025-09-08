'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  variant: 'active' | 'completed' | 'default';
  stepNumber: number;
  className?: string;
}

export function StepIndicator({ variant, stepNumber, className }: StepIndicatorProps) {
  return (
    <div className={cn('step-indicator', variant, className)}>
      {variant === 'completed' ? (
        <Check className="w-4 h-4" />
      ) : (
        <span>{stepNumber}</span>
      )}
    </div>
  );
}
