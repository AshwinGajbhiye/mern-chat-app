import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
    // Generate JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECERET, {
        expiresIn: "15d", // Token expiry set to 15 days
    });

    // Set JWT cookie
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevent access via JavaScript (security against XSS)
        sameSite: "Strict", // Prevent CSRF attacks
        secure: process.env.NODE_ENV === "development", // Only use secure cookies in production
    });
};

export default generateTokenAndSetCookies;
