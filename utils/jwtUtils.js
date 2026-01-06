import jwt from "jsonwebtoken";

//this file is used to create and verify jwt tokens
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

