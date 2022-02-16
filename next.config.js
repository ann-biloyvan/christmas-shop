module.exports = {
  // reactStrictMode: true,
  images: { domains: ['res.cloudinary.com'] },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
