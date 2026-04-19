import "reflect-metadata";
import dotenv from "dotenv";

import { AppDataSource } from "@/config/database";
import { createApp } from "@/app";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");

    // Create Express app
    const app = createApp();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API: http://localhost:${PORT}${process.env.API_PREFIX}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

startServer();
