import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
  },
  { timeStamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: "true" },
    image: { type: String, required: "true" },
    brand: { type: String, required: "true" },
    category: { type: String, required: "true" },
    description: { type: String, required: "true" },
    reviews: [reviewSchema],
    rating: { type: String, required: "true", default: 0 },
    numReviews: { type: Number, required: "true", default: 0 },
    price: { type: Number, required: "true", default: 0 },
    countInStock: { type: Number, required: "true", default: 0 },
  },
  { timestamps: true }
);

const Product =mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
