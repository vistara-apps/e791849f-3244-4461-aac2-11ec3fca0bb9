'use client';

import { useState } from 'react';
import { useX402Client } from '@/lib/x402-client';
import { createPaymentRequest, convertEthToUsdc, formatUsdcAmount } from '@/lib/payment';
import { CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react';

/**
 * Test component for x402 payment integration
 * This component can be used to test the payment flow end-to-end
 */
export function PaymentTest() {
  const [testResults, setTestResults] = useState<{
    walletConnection: boolean;
    x402Ready: boolean;
    paymentTest: 'idle' | 'processing' | 'success' | 'error';
    verificationTest: 'idle' | 'processing' | 'success' | 'error';
    transactionHash?: string;
    error?: string;
  }>({
    walletConnection: false,
    x402Ready: false,
    paymentTest: 'idle',
    verificationTest: 'idle',
  });

  const { x402Client, isReady, isWalletConnected } = useX402Client();

  const runTests = async () => {
    // Test 1: Wallet Connection
    const walletConnected = isWalletConnected;
    
    // Test 2: X402 Ready
    const x402Ready = isReady;
    
    setTestResults(prev => ({
      ...prev,
      walletConnection: walletConnected,
      x402Ready: x402Ready,
    }));

    if (!walletConnected || !x402Ready) {
      return;
    }

    // Test 3: Payment Processing
    setTestResults(prev => ({ ...prev, paymentTest: 'processing' }));
    
    try {
      const testPaymentRequest = createPaymentRequest(
        'test-item-001',
        'Test Legal Checklist',
        '0.001'
      );

      const paymentResult = await x402Client.processPayment(
        testPaymentRequest.amount,
        testPaymentRequest.recipient,
        {
          itemId: testPaymentRequest.itemId,
          description: testPaymentRequest.description,
          test: true,
        }
      );

      if (paymentResult.success && paymentResult.transactionHash) {
        setTestResults(prev => ({
          ...prev,
          paymentTest: 'success',
          transactionHash: paymentResult.transactionHash,
        }));

        // Test 4: Payment Verification
        setTestResults(prev => ({ ...prev, verificationTest: 'processing' }));
        
        const verificationResult = await x402Client.verifyPayment(paymentResult.transactionHash);
        
        setTestResults(prev => ({
          ...prev,
          verificationTest: verificationResult ? 'success' : 'error',
          error: verificationResult ? undefined : 'Payment verification failed',
        }));
      } else {
        throw new Error(paymentResult.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment test failed:', error);
      setTestResults(prev => ({
        ...prev,
        paymentTest: 'error',
        error: error instanceof Error ? error.message : 'Payment test failed',
      }));
    }
  };

  const resetTests = () => {
    setTestResults({
      walletConnection: false,
      x402Ready: false,
      paymentTest: 'idle',
      verificationTest: 'idle',
    });
  };

  const getStatusIcon = (status: 'idle' | 'processing' | 'success' | 'error') => {
    switch (status) {
      case 'processing':
        return <Loader className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const testPrice = '0.001';
  const usdcAmount = convertEthToUsdc(testPrice);

  return (
    <div className="glass-card p-6 rounded-lg shadow-card space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          X402 Payment System Test
        </h3>
        <p className="text-sm text-text-secondary">
          Test the end-to-end payment flow with USDC on Base
        </p>
      </div>

      {/* Test Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Wallet Connection</span>
          <div className="flex items-center space-x-2">
            {testResults.walletConnection ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm">
              {testResults.walletConnection ? 'Connected' : 'Not Connected'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">X402 Client Ready</span>
          <div className="flex items-center space-x-2">
            {testResults.x402Ready ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm">
              {testResults.x402Ready ? 'Ready' : 'Not Ready'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Payment Processing</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon(testResults.paymentTest)}
            <span className="text-sm capitalize">{testResults.paymentTest}</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Payment Verification</span>
          <div className="flex items-center space-x-2">
            {getStatusIcon(testResults.verificationTest)}
            <span className="text-sm capitalize">{testResults.verificationTest}</span>
          </div>
        </div>
      </div>

      {/* Transaction Hash */}
      {testResults.transactionHash && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800 mb-1">Transaction Hash:</p>
          <p className="text-xs font-mono text-blue-700 break-all">
            {testResults.transactionHash}
          </p>
        </div>
      )}

      {/* Error Message */}
      {testResults.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm font-medium text-red-800 mb-1">Error:</p>
          <p className="text-sm text-red-700">{testResults.error}</p>
        </div>
      )}

      {/* Test Configuration */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Test Configuration</h4>
        <div className="space-y-1 text-sm text-text-secondary">
          <p>Amount: {testPrice} ETH (≈ {formatUsdcAmount(usdcAmount)})</p>
          <p>Network: Base</p>
          <p>Token: USDC</p>
          <p>Protocol: x402</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={runTests}
          className="flex-1 btn-primary flex items-center justify-center space-x-2"
          disabled={testResults.paymentTest === 'processing' || testResults.verificationTest === 'processing'}
        >
          <CreditCard className="w-4 h-4" />
          <span>Run Payment Test</span>
        </button>
        <button
          onClick={resetTests}
          className="btn-secondary"
          disabled={testResults.paymentTest === 'processing' || testResults.verificationTest === 'processing'}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
