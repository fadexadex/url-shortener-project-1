import jwt from "jsonwebtoken";
import { IUser } from "./types";

const generateToken = (payload: IUser) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};


export { generateToken, verifyToken };