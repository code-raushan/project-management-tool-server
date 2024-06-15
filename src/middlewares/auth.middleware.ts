import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET as string);

    if (typeof decoded === "object" && "id" in decoded && "role" in decoded) {
      req.user = { id: decoded.id as string, role: decoded.role as string };

      next();
    } else {
      return res.status(401).json({ message: "Invalid token." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};