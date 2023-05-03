import connectDB from "@/config/db";
import Product from "@/models/productModel";
import User from "@/models/userModels";
import wishList from "@/models/wishListModel";




export default async function wishListItems(req,res) {
const userId=req.query.userId;
const {productId}=req.body 


// const loggedInUserId = req.session.userId;
// if (userId !== loggedInUserId) {
//     res.status(403).json({ message: "You do not have permission to view this wishlist." });
//     return;

// }
await connectDB();

if(req.method==='POST') {  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlistItem = await new wishList({
      prod_code:productId,
      user: userId,
      onList:true,  
      
    });

    const savedWishlistItem =  await wishlistItem.save();
    res.status(201).json(savedWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
} else if(req.method==='DELETE') {
 
  console.log("REQUEST",req.body);
try {
  const user = await User.findById(userId);
  const product = await User.findById(productId);
await wishList.deleteOne({prod_code:(productId),user:userId})
  
} catch (error) {
  console.log(error)
}

}
else {
  res.status(400).json({ message: 'Invalid request method' });
  return;
}
}


  // const newItem = new wishList({
  //   user,
  //   name,
  //   description,
  //   category,
  //   brand,
  //   image,
  // });
  //  newItem.save();
  // res.status(201).send({
  //   message: "Success added",
  // });

