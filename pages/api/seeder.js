import Users from "../../data/users";
import products from "../../data/products";
import User from "../../models/userModels";
import Product from "../../models/productModel";
import Order from "../../models/orderModel";
import connectDB from "../../config/db";
import wishList from "@/models/wishListModel";

connectDB();
const importData = async (req, res) => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await wishList.deleteMany();

    const createdUsers = await User.insertMany(Users);

    const adminUser = createdUsers[0]._id;
    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProduct);
    res.send({ message: "seeded successfully" });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
export default importData;
