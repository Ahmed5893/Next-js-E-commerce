import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connect On ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    // process.exit(1);
  }
};

export default connectDB;
