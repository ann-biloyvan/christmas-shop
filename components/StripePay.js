import { Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

export default function StripePay({ items, orderId }) {
  const { enqueueSnackbar } = useSnackbar();

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/keys/session', {
      items: items,
      email: 'test@gmail.com',
      orderId: orderId,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      enqueueSnackbar(result.error.message, { variant: 'error' });
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={createCheckOutSession}
      role="link"
    >
      Pay with Stripe
    </Button>
  );
}
