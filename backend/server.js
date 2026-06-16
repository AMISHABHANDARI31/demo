require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
require("./src/config/cloudinary");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      console.log("Cloudinary configured successfully");
    } else {
      console.warn("Cloudinary is not fully configured. Upload features may be unavailable.");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
