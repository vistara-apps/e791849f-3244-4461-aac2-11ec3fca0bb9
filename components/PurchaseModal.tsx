'use client';

import { useState } from 'react';
import { X, CreditCard, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useX402Client, handlePaymentError, PaymentErrorType } from '@/lib/x402-client';
import { createPaymentRequest, convertEthToUsdc, formatUsdcAmount } from '@/lib/payment';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (transactionHash?: string) => void;
  title: string;
  price: string;
  description: string;
  itemId: string;
}

export function PurchaseModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  price,
  description,
  itemId
}: PurchaseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transactionHash, setTransactionHash] = useState<string>('');
  
  const { x402Client, isReady, isWalletConnected } = useX402Client();

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!isWalletConnected) {
      setErrorMessage('Please connect your wallet to make a payment');
      setPaymentStatus('error');
      return;
    }

    if (!isReady) {
      setErrorMessage('Payment system not ready. Please try again.');
      setPaymentStatus('error');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Create payment request
      const paymentRequest = createPaymentRequest(itemId, title, price);
      
      // Process payment using x402
      const result = await x402Client.processPayment(
        paymentRequest.amount,
        paymentRequest.recipient,
        {
          itemId: paymentRequest.itemId,
          description: paymentRequest.description,
          title,
        }
      );

      if (result.success && result.transactionHash) {
        setTransactionHash(result.transactionHash);
        setPaymentStatus('success');
        
        // Verify the payment
        const isVerified = await x402Client.verifyPayment(result.transactionHash);
        
        if (isVerified) {
          // Call the parent's onConfirm with transaction hash
          await onConfirm(result.transactionHash);
        } else {
          throw new Error('Payment verification failed');
        }
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorInfo = handlePaymentError(error);
      setErrorMessage(errorInfo.userFriendlyMessage);
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setPaymentStatus('idle');
      setErrorMessage('');
      setTransactionHash('');
      onClose();
    }
  };

  const usdcAmount = convertEthToUsdc(price);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-sm w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-text-primary">
            {paymentStatus === 'success' ? 'Payment Successful' : 'Purchase Content'}
          </h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {paymentStatus === 'success' ? (
            // Success State
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Payment Confirmed!</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Your purchase of "{title}" has been completed successfully.
                </p>
                {transactionHash && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-text-secondary mb-1">Transaction Hash:</p>
                    <p className="text-xs font-mono text-text-primary break-all">
                      {transactionHash}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Purchase State
            <>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-text-primary">{title}</h4>
                <p className="text-sm text-text-secondary">{description}</p>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{formatPrice(price)}</div>
                <div className="text-sm text-text-secondary">
                  ≈ {formatUsdcAmount(usdcAmount)} • One-time purchase
                </div>
              </div>

              {/* Wallet Connection Status */}
              {!isWalletConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Wallet Required</p>
                      <p className="text-sm text-yellow-700">
                        Please connect your wallet to make a payment
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {paymentStatus === 'error' && errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Payment Failed</p>
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Secure x402 Payment</p>
                    <p className="text-sm text-blue-700">
                      Payment processed securely using USDC on Base network
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-4 border-t border-gray-200">
          {paymentStatus === 'success' ? (
            <button
              onClick={handleClose}
              className="flex-1 btn-primary"
            >
              Continue
            </button>
          ) : (
            <>
              <button
                onClick={handleClose}
                className="flex-1 btn-secondary"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
                disabled={isProcessing || !isWalletConnected}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {paymentStatus === 'processing' ? 'Processing...' : 'Please wait...'}
                    </span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay {formatUsdcAmount(usdcAmount)}</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
