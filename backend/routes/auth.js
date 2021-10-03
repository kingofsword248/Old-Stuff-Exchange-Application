const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { validate } = require("../validators");
const { rules: loginRules } = require("../validators/auth/login");
const { rules: registrationRules } = require("../validators/auth/register");

router.post("/login", [loginRules, validate], login);

router.post("/register", [registrationRules, validate], register);

router.route("/profile").get(protect, getUserProfile);

module.exports = router;
