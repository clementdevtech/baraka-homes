import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, default: null },
    location: { type: String, required: true },
    image: { type: String, required: true },
    images: [String],
    desc: String,
    paymentPlan: String,
    amenities: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
