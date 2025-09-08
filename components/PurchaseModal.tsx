'use client';

import { useState } from 'react';
import { X, CreditCard, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  price: string;
  description: string;
}

export function PurchaseModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  price,
  description
}: PurchaseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-sm w-full animate-slide-up border border-gray-100">
        {/* Header */}
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-r from-accent to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold text-text-primary mb-2">Unlock Premium Content</h3>
          <p className="text-sm text-text-secondary">Get instant access to expert legal guidance</p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-6">
          <div className="text-center space-y-3">
            <h4 className="text-lg font-bold text-text-primary">{title}</h4>
            <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-center text-white">
            <div className="text-3xl font-bold mb-1">{formatPrice(price)}</div>
            <div className="text-sm opacity-90">One-time purchase • Lifetime access</div>
          </div>

          {/* Value Props */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-text-secondary">Expert-reviewed legal guidance</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-text-secondary">Step-by-step action plans</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-text-secondary">Instant access, no subscription</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">Secure Payment</p>
                <p className="text-xs text-blue-700">
                  Powered by Base network • Your transaction is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-text-primary px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
            disabled={isProcessing}
          >
            Maybe Later
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Purchase Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
