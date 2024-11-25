import express from 'express';
import Stripe from 'stripe';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stripe = new Stripe('acct_1Pua59RqqZpIo2TN', {
  apiVersion: '2023-10-16',
});

const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, '../dist')));

app.post('/api/create-payment-session', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Investissement SOFTNET Groupe SA',
              description: 'Investissement dans SOFTNET Groupe SA',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ 
      error: 'Failed to create payment session',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});