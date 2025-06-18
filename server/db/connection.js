import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Remove deprecated options (no longer needed in Mongoose 6+)
    const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
