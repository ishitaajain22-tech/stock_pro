const express = require("express");
const { verifyUser } = require("./AuthMiddleware");
const { SignupAuth, LoginAuth } = require("./AuthController");

const router = express.Router();

// Signup route
router.post("/signup", SignupAuth);

// Login route
router.post("/login", LoginAuth);

// Example protected route
router.post("/profile", verifyUser, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User verified successfully",
        user: req.user
    });
});

module.exports = router;