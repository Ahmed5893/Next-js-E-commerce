import connectDB from "@/config/db";
import Order from "@/models/orderModel";
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  try {
    const user = await getToken({ req });
    const id = req.query.id;
    if (!user) {
      return res.status(401).send('Sign in required');
    }

    await connectDB();
    const order = await Order.findById(id);

    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

export default handler;
