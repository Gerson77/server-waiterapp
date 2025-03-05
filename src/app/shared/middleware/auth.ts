import { NextFunction, Request, Response } from "express";
import { JWTtoken } from "../token/jwt.token";

export const ensureAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    res.status(401).json({
      error: "Token is missing!",
    });
    return;
  }
  const [, token] = headerAuth.split(" ");

  if (!token) {
    res.status(401).json({
      error: "Token is missing",
    });
    return;
  }
  const verifyToken = new JWTtoken().validate(token);

  if (verifyToken) {
    return next();
  }

  res.status(401).json({
    error: "Token is missing",
  });
  return;
};
