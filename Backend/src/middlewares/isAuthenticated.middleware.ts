import { NextFunction, Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?._id) {
    throw new Error("Unauthorized. Please log in.");
  }
  next();
};

export default isAuthenticated;
