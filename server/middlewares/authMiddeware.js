import prisma from "../utils/db.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) { // Changé de 'jwt' à 'token'
    token = req.cookies.token;
  }

  if (!token) {
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    next();
  } catch (error) {
    console.error('JWT Error:', error);
    console.error('JWT_SECRET:', process.env.JWT_SECRET); // Pour le débogage
    res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(401).json({ message: "Not authorized as an admin" });
  }
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
});

export { authMiddleware, isAdmin };
