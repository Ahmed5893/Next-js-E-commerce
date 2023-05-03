import connectDB from "@/config/db";
import Order from "@/models/orderModel";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
    const user = await getToken({ req });
    if (!user) {
      return res.status(401).send({ message: 'signin required' });
    }
    await connectDB();
    const orders = await Order.find({ user: user._id });
    res.send(orders);
  };
  
  export default handler;