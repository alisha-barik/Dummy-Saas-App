import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo connected");
  } catch (err) {
    console.log("errror bhai", err);
  }
};
