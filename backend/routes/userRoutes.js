const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const { protect } = require("../middleware/authMiddleware");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
