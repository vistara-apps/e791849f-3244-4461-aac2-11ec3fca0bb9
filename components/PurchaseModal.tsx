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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-sm w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-text-primary">Purchase Content</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-text-primary">{title}</h4>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{formatPrice(price)}</div>
            <div className="text-sm text-text-secondary">One-time purchase</div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Secure Payment</p>
                <p className="text-sm text-blue-700">
                  Payment processed securely on Base network
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 btn-primary flex items-center justify-center space-x-2"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Purchase</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
