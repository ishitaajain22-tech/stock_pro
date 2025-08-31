const jwt = require("jsonwebtoken");
let User;

try {
    User = require("../models/UserModel");
} catch (error) {
    console.error('UserModel not found, creating fallback');
    User = null;
}

const verifyUser = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Please login first.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

        if (User) {
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token. User not found.'
                });
            }
            req.user = user;
        } else {
            req.user = { _id: decoded.id, id: decoded.id };
        }

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token.'
        });
    }
};

module.exports = { verifyUser };
