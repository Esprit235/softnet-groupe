import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Paypal, X } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onSuccess: (details: any) => void;
}

// Use the actual Stripe publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStripePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe n\'a pas pu être initialisé');

      const response = await fetch('/api/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
      }

      const session = await response.json();
      
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (redirectError) {
        throw redirectError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez votre méthode de paiement</h3>
        
        <div className="space-y-6">
          <div className="text-center bg-gray-50 p-4 rounded-lg">
            <p className="text-lg text-gray-600">Montant à payer</p>
            <p className="text-3xl font-bold text-blue-600">{amount.toLocaleString()} USD</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleStripePayment}
            disabled={isProcessing}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="h-5 w-5" />
            <span>{isProcessing ? 'Traitement en cours...' : 'Payer par carte'}</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>

          <div className="paypal-button-container">
            <PayPalScriptProvider options={{ 
              "client-id": "test", // Replace with your actual PayPal client ID
              currency: "USD",
              intent: "capture"
            }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                disabled={isProcessing}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount.toString(),
                          currency_code: "USD"
                        },
                        description: 'Investissement SOFTNET Groupe SA',
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  try {
                    setIsProcessing(true);
                    const details = await actions.order!.capture();
                    onSuccess(details);
                  } catch (err) {
                    setError('Erreur lors du traitement du paiement PayPal');
                    console.error('PayPal error:', err);
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                onError={(err) => {
                  setError('Erreur lors de l\'initialisation de PayPal');
                  console.error('PayPal error:', err);
                }}
              />
            </PayPalScriptProvider>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;