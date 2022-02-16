import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    image: { type: String, required: true },
    subImage: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    color: { type: String, required: true },
    composition: { type: String, required: true },
    article: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
