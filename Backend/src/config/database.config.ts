import mongoose from "mongoose";
import { appConfig } from "./app.config";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(appConfig.MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;