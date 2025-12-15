import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = header.replace("Bearer ", "");

  try {
    const payload = verifyJwt(token) as any;
    (req as any).userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
