const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend health check passed",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
