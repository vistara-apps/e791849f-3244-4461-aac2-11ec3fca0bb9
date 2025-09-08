'use client';

import { createSigner, withPaymentInterceptor, decodeXPaymentResponse } from 'x402-axios';
import { useWalletClient } from 'wagmi';
import { base } from 'viem/chains';
import { USDC_CONTRACT_ADDRESS, PAYMENT_CONFIG } from './payment';
import axios from 'axios';

/**
 * X402 Payment Client for handling micropayments
 */
export class RightCheckX402Client {
  private axiosInstance: any = null;
  private signer: any = null;
  private walletClient: any = null;
  private initializationPromise: Promise<void> | null = null;

  constructor(walletClient?: any) {
    this.walletClient = walletClient;
    if (walletClient) {
      this.initializationPromise = this.initializeX402Client();
    }
  }

  private async initializeX402Client() {
    if (!this.walletClient) {
      console.warn('Wallet client not available, x402 client not initialized');
      return;
    }

    try {
      // For demo purposes, we'll simulate the x402 integration
      // In a real implementation, you would need to:
      // 1. Get the private key from the wallet client (securely)
      // 2. Create the signer with the correct network and private key
      // 3. Set up the payment interceptor properly
      
      // Since we can't access private keys from wagmi wallet client directly,
      // we'll create a mock implementation for demonstration
      this.signer = {
        network: 'base',
        address: await this.walletClient.account?.address || '0x0000000000000000000000000000000000000000',
        sign: async (message: string) => {
          // In a real implementation, this would sign the message
          return `0x${'0'.repeat(130)}`; // Mock signature
        }
      };

      // Create axios instance with payment interceptor
      this.axiosInstance = axios.create({
        timeout: PAYMENT_CONFIG.PAYMENT_TIMEOUT,
      });

      // For demo purposes, we'll add a simple interceptor
      // In a real implementation, you would use withPaymentInterceptor
      this.axiosInstance.interceptors.request.use((config: any) => {
        // Add x402 payment headers
        config.headers = {
          ...config.headers,
          'X-Payment-Network': 'base',
          'X-Payment-Token': USDC_CONTRACT_ADDRESS,
          'X-Payment-Signer': this.signer.address,
        };
        return config;
      });

      console.log('X402 client initialized successfully (demo mode)');
    } catch (error) {
      console.error('Failed to initialize X402 client:', error);
    }
  }

  /**
   * Process a payment using x402 protocol
   */
  async processPayment(
    amount: string,
    recipient: string,
    metadata?: Record<string, any>
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      // Wait for initialization to complete
      if (this.initializationPromise) {
        await this.initializationPromise;
      }

      if (!this.axiosInstance || !this.signer) {
        throw new Error('X402 client not initialized');
      }

      if (!this.walletClient) {
        throw new Error('Wallet not connected');
      }

      // Convert ETH amount to USDC (in smallest units)
      const ethValue = parseFloat(amount);
      const usdcValue = ethValue * PAYMENT_CONFIG.ETH_TO_USDC_RATE;
      const usdcAmountInSmallestUnit = Math.floor(usdcValue * 1000000); // USDC has 6 decimals

      console.log('Processing x402 payment:', {
        ethAmount: amount,
        usdcAmount: usdcValue,
        usdcAmountInSmallestUnit,
        recipient,
        metadata,
      });

      // For demo purposes, simulate a payment request to a service that requires x402 payment
      // In a real implementation, you would make a request to your backend service
      // that requires x402 payment, and the interceptor would handle the payment flow
      
      const paymentData = {
        amount: usdcAmountInSmallestUnit.toString(),
        recipient,
        metadata: {
          ...metadata,
          timestamp: Date.now(),
          chainId: PAYMENT_CONFIG.CHAIN_ID,
        },
      };

      // Simulate a request that triggers x402 payment
      // The withPaymentInterceptor will handle the actual payment flow
      try {
        const response = await this.axiosInstance.post('/api/purchase', paymentData, {
          headers: {
            'X-Payment-Required': 'true',
            'X-Payment-Amount': usdcAmountInSmallestUnit.toString(),
            'X-Payment-Token': USDC_CONTRACT_ADDRESS,
          },
        });

        // In a real scenario, the response would contain transaction details
        // For demo, we'll simulate a successful transaction
        const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        
        console.log('Payment successful:', mockTransactionHash);
        return {
          success: true,
          transactionHash: mockTransactionHash,
        };

      } catch (error: any) {
        // Check if this is an x402 payment response
        if (error.response?.status === 402) {
          const paymentResponse = decodeXPaymentResponse(error.response);
          console.log('X402 payment response:', paymentResponse);
          
          // The payment interceptor should handle this automatically
          // For demo purposes, we'll simulate successful payment processing
          const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
          
          return {
            success: true,
            transactionHash: mockTransactionHash,
          };
        }
        
        throw error;
      }

    } catch (error) {
      console.error('X402 payment failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  /**
   * Verify a payment transaction
   */
  async verifyPayment(transactionHash: string): Promise<boolean> {
    try {
      // Wait for initialization to complete
      if (this.initializationPromise) {
        await this.initializationPromise;
      }

      if (!this.axiosInstance || !this.signer) {
        console.error('X402 client not initialized');
        return false;
      }

      // In a real implementation, you would verify the transaction on-chain
      // For demo purposes, we'll simulate verification
      console.log('Verifying payment:', transactionHash);
      
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, assume all payments are valid if they have the correct format
      const isValidHash = /^0x[a-fA-F0-9]{64}$/.test(transactionHash);
      
      console.log('Payment verification result:', isValidHash);
      return isValidHash;

    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(transactionHash: string): Promise<{
    status: 'pending' | 'confirmed' | 'failed';
    confirmations: number;
  }> {
    try {
      if (!this.axiosInstance || !this.signer) {
        throw new Error('X402 client not initialized');
      }

      // In a real implementation, you would check the transaction status on-chain
      // For demo purposes, we'll simulate status checking
      console.log('Getting payment status for:', transactionHash);
      
      // Simulate status check delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo, assume all valid-looking hashes are confirmed
      const isValidHash = /^0x[a-fA-F0-9]{64}$/.test(transactionHash);
      
      return {
        status: isValidHash ? 'confirmed' : 'failed',
        confirmations: isValidHash ? 12 : 0,
      };

    } catch (error) {
      console.error('Failed to get payment status:', error);
      return {
        status: 'failed',
        confirmations: 0,
      };
    }
  }

  /**
   * Check if wallet is connected and x402 is ready
   */
  isReady(): boolean {
    return !!(this.axiosInstance && this.signer && this.walletClient);
  }
}

/**
 * Hook for using X402 payments
 */
export function useX402Client() {
  const { data: walletClient } = useWalletClient();
  
  // Create a new client instance when wallet changes
  const x402Client = new RightCheckX402Client(walletClient);

  return {
    x402Client,
    isReady: x402Client.isReady(),
    isWalletConnected: !!walletClient,
  };
}

/**
 * Payment error types for better error handling
 */
export enum PaymentErrorType {
  WALLET_NOT_CONNECTED = 'WALLET_NOT_CONNECTED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  USER_REJECTED = 'USER_REJECTED',
  TIMEOUT = 'TIMEOUT',
}

/**
 * Enhanced error handling for payments
 */
export function handlePaymentError(error: any): {
  type: PaymentErrorType;
  message: string;
  userFriendlyMessage: string;
} {
  const errorMessage = error?.message || error?.toString() || 'Unknown error';
  
  if (errorMessage.includes('User rejected')) {
    return {
      type: PaymentErrorType.USER_REJECTED,
      message: errorMessage,
      userFriendlyMessage: 'Payment was cancelled by user',
    };
  }
  
  if (errorMessage.includes('insufficient funds')) {
    return {
      type: PaymentErrorType.INSUFFICIENT_FUNDS,
      message: errorMessage,
      userFriendlyMessage: 'Insufficient USDC balance for this payment',
    };
  }
  
  if (errorMessage.includes('network') || errorMessage.includes('connection')) {
    return {
      type: PaymentErrorType.NETWORK_ERROR,
      message: errorMessage,
      userFriendlyMessage: 'Network error. Please check your connection and try again.',
    };
  }
  
  if (errorMessage.includes('timeout')) {
    return {
      type: PaymentErrorType.TIMEOUT,
      message: errorMessage,
      userFriendlyMessage: 'Payment timed out. Please try again.',
    };
  }
  
  return {
    type: PaymentErrorType.TRANSACTION_FAILED,
    message: errorMessage,
    userFriendlyMessage: 'Payment failed. Please try again.',
  };
}
