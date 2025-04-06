import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Remove deprecated options (no longer needed in Mongoose 6+)
    const conn = await mongoose.connect(process.env.MONGODB_URI);

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

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(async () => {
//     console.log("✅ MongoDB Connected to DB:", mongoose.connection.name);
//     console.log(
//       "📌 Collections:",
//       (await mongoose.connection.db.listCollections().toArray()).map(
//         (c) => c.name
//       )
//     );
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));
