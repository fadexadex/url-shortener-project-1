import { register, login } from "../services";
import e, { Request, Response, NextFunction } from "express";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const user = await register(email, password, name);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { registerController, loginController };
