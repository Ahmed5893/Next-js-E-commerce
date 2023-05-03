import connectDB from "@/config/db";
import Order from "@/models/orderModel";
import { getToken } from 'next-auth/jwt';

 const handler=async(req,res)=>{

const user=await getToken({req}) ;
if(!user){
return res.status(401).send('Sign in required')
}
await connectDB();

const newOrder=await new Order({
...req.body,
user:user._id
})

const order=await newOrder.save();
res.status(201).send(order);

};

export default handler