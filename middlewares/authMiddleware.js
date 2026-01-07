import { verifyToken } from "../utils/jwtUtils.js";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);
    req.user = user; // { id, role }
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Role does not match" });
    }
    next();
  };
};
