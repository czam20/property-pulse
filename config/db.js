import mongoose from "mongoose";

let conected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (conected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    conected = true;
  } catch (error) {
    console.log(error)
  }
};

export default connectDB;
