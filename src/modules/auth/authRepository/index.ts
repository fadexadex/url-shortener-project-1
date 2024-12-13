import { PrismaClient } from "@prisma/client";
import { IUserCreate } from "utils/types";

class AuthRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createUser(data: IUserCreate) {
    return await this.prisma.user.create({ data });
  }
  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}

export default AuthRepository;
