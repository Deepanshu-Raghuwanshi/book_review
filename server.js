const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const responseInterceptor = require("./middleware/responseInterceptor");
const swaggerConfig = require("./utils/swagger");

// Import routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(responseInterceptor);

// Set port
const port = process.env.PORT || 5000;

// Health check route
app.use("/healthcheck", (req, res) =>
  res.send(`Server running on port ${port}`)
);

// Swagger documentation
app.use("/api-docs", swaggerConfig.serve, swaggerConfig.setup);

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/search", searchRoutes);

// Error handler middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
