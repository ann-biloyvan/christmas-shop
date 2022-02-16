import nc from 'next-connect';

import Product from '../../models/Product';
import { isAuth } from '../../utils/auth';
import db from '../../utils/db';
import { onError } from '../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.put(async (req, res) => {
  const { cartItems } = req.body;
  try {
    await db.connect();
    await cartItems.map(async (item) => {
      const product = await Product.findById(item._id);
      if (product) {
        product.countInStock =
          product.countInStock - item.quantity > 0
            ? product.countInStock - item.quantity
            : 0;
        await product.save();
        await db.disconnect();
        res.send({ message: 'amount changed' });
      } else {
        await bd.disconnect();
        res.status(400).send({ message: 'smthg went wrong' });
      }
    });
  } catch (err) {
    console.warn(err.message);
  }
});

export default handler;
