import mongoose from "mongoose";

const wishListSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    prod_code: {type:mongoose.Schema.Types.ObjectId, required: "true",ref:"Product" },
    onList: { type: Boolean, required: "true", default: false },

  },
  { timestamps: true }
);

const wishList =
  mongoose.models.wishList || mongoose.model("wishList", wishListSchema);

export default wishList;
