import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const urlCreationSchema = Joi.object({
  originalUrl: Joi.string().uri().required(),
});

export const redirectUrlSchema = Joi.object({
  id: Joi.string().required(),
});
