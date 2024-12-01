const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Check for the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // Ensure the token starts with "Bearer"
    const parts = authHeader.split(" ");
    if (parts[0] !== "Bearer" || parts.length !== 2) {
      return res
        .status(400)
        .json({ error: "Malformed token. Expected 'Bearer <token>' format." });
    }

    const token = parts[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request object
    next(); // Pass control to the next middleware
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res
        .status(400)
        .json({ error: "Invalid token. Please provide a valid token." });
    }
    console.error("JWT Verification Error:", err); // Log unexpected errors
    res.status(500).json({ error: "Internal server error." });
  }
};
