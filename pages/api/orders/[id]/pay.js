const { default: connectDB } = require("@/config/db");
const { default: Order } = require("@/models/orderModel");
const { getSession } = require("next-auth/react");



const handler=async(req,res)=>{
    const session=await getSession({req});
    if(!session){
    return res.status(401).send('Sign in requires')
    }
await connectDB();
const order=await Order.findById(req.query.id)
if(order){
if(order.isPaid){
return res.status(400).send('Order is already paid')
}
order.isPaid=true;
order.paidAt=Date.now();
order.paymentResult={
id:req.body.id,
status:req.body.status,
email_address:req.body.email_address
}
const paidOrder=await Order.save();
res.send({message:"Order  paid successfully!",order:paidOrder});
}
else{
    return res.status(404).send({message:"Order  Not Found!"})

}
}

export default handler;