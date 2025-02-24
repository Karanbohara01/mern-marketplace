import jwt from "jsonwebtoken";

/**
 * Middleware to verify if the user has admin privileges.
 * Assumes the JWT contains a payload with a "role" property set to "admin" for admin users.
 */
const requireAdmin = (req, res, next) => {
  // Extract the token from headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's role is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Pass the decoded user info to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default requireAdmin;
