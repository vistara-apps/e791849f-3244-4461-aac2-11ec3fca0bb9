'use client';

import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, ArrowLeft } from 'lucide-react';
import { Checklist, ChecklistStep } from '@/lib/types';
import { StepIndicator } from './StepIndicator';
import { getCategoryIcon } from '@/lib/utils';

interface ChecklistViewProps {
  checklist: Checklist;
  onBack: () => void;
  onPurchase?: () => void;
}

export function ChecklistView({ checklist, onBack, onPurchase }: ChecklistViewProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getStepVariant = (index: number, stepId: string) => {
    if (completedSteps.has(stepId)) return 'completed';
    if (index === currentStep) return 'active';
    return 'default';
  };

  const categoryIcon = getCategoryIcon(checklist.category);

  if (checklist.premium && !onPurchase) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-xl">{categoryIcon}</span>
            <h1 className="text-2xl font-bold text-text-primary">{checklist.title}</h1>
          </div>
        </div>

        {/* Premium Unlock */}
        <div className="glass-card p-6 rounded-lg shadow-card text-center space-y-4">
          <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Premium Content</h3>
          <p className="text-base text-text-secondary">
            Unlock this comprehensive checklist for {checklist.price} ETH
          </p>
          <button
            onClick={onPurchase}
            className="btn-accent w-full"
          >
            Purchase for {checklist.price} ETH
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{categoryIcon}</span>
          <h1 className="text-2xl font-bold text-text-primary">{checklist.title}</h1>
        </div>
      </div>

      {/* Description */}
      <div className="glass-card p-4 rounded-lg shadow-card">
        <p className="text-base leading-6 text-text-secondary">{checklist.description}</p>
      </div>

      {/* Progress */}
      <div className="glass-card p-4 rounded-lg shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Progress</span>
          <span className="text-sm text-text-secondary">
            {completedSteps.size} of {checklist.steps.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.size / checklist.steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {checklist.steps.map((step, index) => (
          <div
            key={step.id}
            className="glass-card p-4 rounded-lg shadow-card animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              <StepIndicator
                variant={getStepVariant(index, step.id)}
                stepNumber={index + 1}
              />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        completedSteps.has(step.id) ? 'text-green-500' : 'text-gray-300'
                      }`}
                    />
                  </button>
                </div>
                
                <p className="text-base leading-6 text-text-secondary">
                  {step.description}
                </p>
                
                {step.action && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Action:</p>
                        <p className="text-sm text-blue-700">{step.action}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {step.warning && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Warning:</p>
                        <p className="text-sm text-yellow-700">{step.warning}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion */}
      {completedSteps.size === checklist.steps.length && (
        <div className="glass-card p-6 rounded-lg shadow-card text-center space-y-3 bg-green-50 border border-green-200">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-green-800">Checklist Complete!</h3>
          <p className="text-sm text-green-700">
            You've completed all steps. Remember to keep this information handy for future reference.
          </p>
        </div>
      )}
    </div>
  );
}
