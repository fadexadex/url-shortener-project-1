import { Request, Response, NextFunction } from "express";
import {
  registerSchema,
  loginSchema,
  urlCreationSchema,
  redirectUrlSchema,
} from "../../middlewares/validators/validatorSchemas";
import { AppError } from "../errorHandler";

const validateRegisterBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    next(new AppError(error.message, 400));
  }
  next();
};

const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    next(new AppError(error.message, 400));
  }
  next();
};

const validateUrlCreationBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = urlCreationSchema.validate(req.body);
  if (error) {
    next(new AppError(error.message, 400));
  }
  next();
};

const validateRedirectUrlParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = redirectUrlSchema.validate(req.params);
  if (error) {
    next(new AppError(error.message, 400));
  }
  next();
};

export {
  validateLoginBody,
  validateRegisterBody,
  validateRedirectUrlParams,
  validateUrlCreationBody,
};
