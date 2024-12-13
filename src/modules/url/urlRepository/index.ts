import { PrismaClient } from "@prisma/client";
import { IUrl } from "utils/types/index.ts";

export class UrlRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createUrl(data: IUrl) {
    return await this.prisma.url.create({ data });
  }
  async getUserUrls(userId: number) {
    return await this.prisma.url.findMany({ where: { userId } });
  }

  async updateClicksAndLocation(id: string, country: string) {
    return await this.prisma.url.update({
      where: { id },
      data: {
        clicksCount: { increment: 1 },
        clicks: {
          create: [
            {
              country,
            },
          ],
        },
      },
    });
  }
  async getUrlById(id: string) {
    return await this.prisma.url.findUnique({ where: { id } });
  }
  async getUrlAllClicks(id: string) {
    return await this.prisma.url.findUnique({
      where: { id },
      include: { clicks: true },
    });
  }
}
