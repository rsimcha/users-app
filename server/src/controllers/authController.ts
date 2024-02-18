import { Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const login = async (req: Request, res: Response) => {
  const accessToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  return res.status(200).json({ accessToken });
};
