import { AppError } from "../../../middlewares/errorHandler";
import AuthRepository from "../authRepository";
import { hashPassword, comparePassword } from "../../../utils/bcrypt";
import { generateToken } from "../../../utils/jwt";
import { IUser } from "../../../utils/types";

const authRepository = new AuthRepository();

const register = async (email: string, password: string, name: string) => {
  const alreadyRegistered = await authRepository.getUserByEmail(email);
  if (alreadyRegistered) {
    throw new AppError("User with provided email already exists", 409);
  }
  const passwordHash = await hashPassword(password);
  const user = await authRepository.createUser({
    email,
    name,
    password: passwordHash,
  });
  if (!user) {
    throw new AppError("An error occured while creating user", 500);
  }
  const { password: _, ...newUser } = user;
  (newUser as IUser).token = generateToken(newUser);
  return newUser;
};

const login = async (email: string, password: string) => {
  const user = await authRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError("No user with provided email exists", 401);
  }
  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Password is incorrect", 401);
  }
  const { password: _, ...newUser } = user;
  (newUser as IUser).token = generateToken(newUser);
  return newUser;
};

export { register, login };
