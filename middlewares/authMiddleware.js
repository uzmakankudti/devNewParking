import { verifyToken } from "../utils/jwtUtils.js";


/*
  AUTH MIDDLEWARE
  ----------------
  This middleware:
  1. Checks if token is present in request
  2. Verifies the token using JWT_SECRET
  3. Extracts user info (id, role)
  4. Attaches user info to req.user
  5. Allows request to continue
*/

const authMiddleware = (req, res, next) => {
  try {
    //  Read Authorization header from request
    const authHeader = req.headers.authorization;
    
    // If header is missing OR not starting with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract token from header
    // Example: "Bearer abc.def.ghi" → token = "abc.def.ghi"
    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
