import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Remove deprecated options (no longer needed in Mongoose 6+)

    const host = process.env.MONGO_HOST;
    const port = process.env.MONGO_PORT;
    const user = process.env.MONGO_USER;
    const pass = process.env.MONGO_PASS;
    const db = process.env.MONGO_DB;

    if (!host || !port || !user || !pass || !db) {
      console.error("❌ Missing MongoDB environment variables");
      process.exit(1);
    }
    console.log(
      `🔗 Connecting to MongoDB at ${host}:${port} with user ${user} and DB ${db}`
    );

    const MONGODB_URI = `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;

    const conn = await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB Connected to DB:", conn.connection.name);

    // Get collections list safely
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(
      "📌 Collections:",
      collections.map((c) => c.name)
    );

    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
