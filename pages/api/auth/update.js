import connectDB from "@/config/db";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export default async function updateProfile(req, res) {
  
    const { id,name, email, password } = req.body;
  
    await connectDB();
   
    const filter = {_id:id};
const update =  { name:name,email:email,password:password };
    const user = await User.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(200).json({
        message: "User name updated successfully",
        user: user
      });
    
}
  