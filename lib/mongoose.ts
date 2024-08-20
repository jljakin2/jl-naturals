import mongoose from "mongoose";
import Product from "@/models/Product";

const connectMongo = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "Add the MONGODB_URI environment variable inside .env.local to use mongoose"
    );
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (e: any) {
    console.error("Mongoose Client Error: " + e.message);
  }
};

export default connectMongo;
