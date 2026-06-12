// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 🔒 Grabs the connection string securely from the loaded env memory layout
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`⚡ Connected smoothly to secured MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection failure: ${error.message}`);
    process.exit(1); // Force shut down backend execution thread if connection drops
  }
};

export default connectDB;