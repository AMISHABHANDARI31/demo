const cloudinary = require("../config/cloudinary");
const { successResponse } = require("../utils/apiResponse");

const getTestMessage = (req, res) => {
  return successResponse(res, "Frontend connected to backend successfully", {
    backend: "running",
    mongoDb: "configured",
    cloudinary: cloudinary.config().cloud_name ? "configured" : "missing config"
  });
};

module.exports = {
  getTestMessage
};
