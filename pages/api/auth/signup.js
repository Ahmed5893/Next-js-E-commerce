import connectDB from "@/config/db";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;

  await connectDB();
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });
  const user = await newUser.save();
  res.status(201).send({
    message: "Success Created User",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

