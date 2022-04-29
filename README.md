# Short instructions

Demo: https://christmas-shop-nextjs.vercel.app/

to login as admin and see more features:

```
login: admin@example.com
password: 123456
```

[to pay with Stripe](https://stripe.com/docs/testing):

- Use this test card 4242 4242 4242 4242 ;

- Use a valid future date, such as 12/34;
- Use any three-digit CVC (four digits for American Express cards);
- Use any value you like for other form fields.

---

# About this project

This is a single-page application of an e-commerce webshop.

### Stack:

1. Next.js 12;
2. Materil UI v.5+;
3. Mongo DB + Mongoose;

All data on products, registered users, orders, sales, etc. is created with Mongoose schemas and stored in Mongo DB. It could be accessed, changed, and added from UI. Also, information in the database updates automatically, as, for example, an order is created and the total amount of products changes or information from a webhook tells that an order was paid.

## Admin dashboard

**to access those features register as:**

```
login: admin@example.com
password: 123456
```

A user with administrator permission has access to some specific features:

- Remove / update / create new products from UI, including uploading images using Cloudinary;

- Look through automatically created sales charts;

- Look through the list of all orders and match them as delivered;

- Look through the list of all users and give them administrator permission.

## Users

Everyone can look through and add to cart products, but only registered users could create orders. Some pages couldn't be accessed without registration. Also, every registered user has access to information on their orders and can change their name, email, and password to their account from UI.

Users can pay for their orders using cash, **_PayPal_** and **_Stripe_** systems. Information on time and payment method is stored and orders could be paid later.

## To run the code locally

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
