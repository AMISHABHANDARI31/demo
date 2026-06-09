require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const cloudinary = require("./src/config/cloudinary");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    console.log(`Cloudinary configured for cloud: ${cloudinary.config().cloud_name}`);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
