const User = require("./models/UserModel");
const { createSecretToken } = require("./SecretToken");

const SignupAuth = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // check missing fields
    if (!username || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // create new user (raw password → schema will hash it automatically)
    const newUser = new User({
      username,
      name,
      email,
      password,
    });

    await newUser.save();

    // generate JWT
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // only secure in prod
    });

    // send safe user object (no password)
    const { password: _, ...safeUser } = newUser.toObject();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const LoginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // check password using schema method
    const isMatch = await validUser.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // generate token
    const token = createSecretToken(validUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    // send safe user object (no password)
    const { password: _, ...safeUser } = validUser.toObject();

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { SignupAuth, LoginAuth };