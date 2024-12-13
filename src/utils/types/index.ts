import { Click } from "@prisma/client";

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}

export interface IUrl {
  id: string;
  shortUrl?: string;
  originalUrl: string;
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
