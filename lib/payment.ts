'use client';

import { useWalletClient } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { base } from 'viem/chains';

// USDC contract address on Base
export const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Payment configuration
export const PAYMENT_CONFIG = {
  // Convert ETH prices to USDC (assuming 1 ETH = 3000 USDC for demo)
  ETH_TO_USDC_RATE: 3000,
  // Base network configuration
  CHAIN_ID: base.id,
  // Payment timeout in milliseconds
  PAYMENT_TIMEOUT: 30000,
};

export interface PaymentRequest {
  amount: string; // Amount in ETH
  recipient: string; // Recipient address
  description: string; // Payment description
  itemId: string; // Item being purchased
}

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

/**
 * Convert ETH amount to USDC amount
 */
export function convertEthToUsdc(ethAmount: string): string {
  const ethValue = parseFloat(ethAmount);
  const usdcValue = ethValue * PAYMENT_CONFIG.ETH_TO_USDC_RATE;
  return usdcValue.toFixed(2);
}

/**
 * Format USDC amount for display
 */
export function formatUsdcAmount(amount: string): string {
  return `$${parseFloat(amount).toFixed(2)} USDC`;
}

/**
 * Custom hook for x402 payments using wagmi wallet client
 */
export function useX402Payment() {
  const { data: walletClient } = useWalletClient();

  const processPayment = async (paymentRequest: PaymentRequest): Promise<PaymentResult> => {
    try {
      if (!walletClient) {
        throw new Error('Wallet not connected');
      }

      // Convert ETH amount to USDC
      const usdcAmount = convertEthToUsdc(paymentRequest.amount);
      const amountInWei = parseEther(paymentRequest.amount);

      // For demo purposes, we'll simulate a USDC payment on Base
      // In a real implementation, you would:
      // 1. Create an x402 payment request
      // 2. Use x402-axios to handle the payment flow
      // 3. Process the actual USDC transfer

      console.log('Processing x402 payment:', {
        amount: paymentRequest.amount,
        usdcAmount,
        recipient: paymentRequest.recipient,
        description: paymentRequest.description,
        itemId: paymentRequest.itemId,
      });

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo, we'll simulate a successful transaction
      const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

      return {
        success: true,
        transactionHash: mockTransactionHash,
      };

    } catch (error) {
      console.error('Payment failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed',
      };
    }
  };

  const verifyPayment = async (transactionHash: string): Promise<boolean> => {
    try {
      if (!walletClient) {
        return false;
      }

      // In a real implementation, you would verify the transaction on-chain
      // For demo purposes, we'll simulate verification
      console.log('Verifying payment:', transactionHash);
      
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, assume all payments are valid
      return true;

    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  };

  return {
    processPayment,
    verifyPayment,
    isWalletConnected: !!walletClient,
  };
}

/**
 * Get payment recipient address (in a real app, this would be your business address)
 */
export function getPaymentRecipient(): string {
  // Demo recipient address - replace with your actual business address
  return '0x742d35Cc6634C0532925a3b8D0C9C0E3C5C7C5C5';
}

/**
 * Create a payment request for a checklist item
 */
export function createPaymentRequest(itemId: string, title: string, price: string): PaymentRequest {
  return {
    amount: price,
    recipient: getPaymentRecipient(),
    description: `Purchase: ${title}`,
    itemId,
  };
}
