import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());

// API routes
app.use("/api/products", productRoutes);

// Serve frontend (only if you're deploying both in one Render service)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Connect DB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to database:", err);
});
