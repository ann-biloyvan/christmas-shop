const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items, email, orderId, taxPrice, shippingPrice } = req.body;

  const sum = taxPrice + shippingPrice;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: sum * 100,
            currency: 'usd',
          },
          display_name: 'Shipping + taxes',
        },
      },
    ],
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${req.headers.origin}/order/${orderId}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/order/${orderId}`,
    metadata: {
      email,
    },
  });

  res.status(200).json({ id: session.id });
}
