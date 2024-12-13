import { AppError } from "../../../middlewares/errorHandler";
import {
  generateShortUrl,
  getOriginalUrl,
  getAllUrlClicks,
  getUserUrls,
} from "../services";
import { Request, Response, NextFunction } from "express";

const createShortUrlCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { originalUrl } = req.body;
    const userId = req.user.id;
    const shortUrl = await generateShortUrl(originalUrl, userId);
    res.status(201).json({ shortUrl });
  } catch (error) {
    next(error);
  }
};

const redirectUrlCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ip = req.socket.remoteAddress.split("::ffff:")[1];
    const originalUrl = await getOriginalUrl(id, ip);
    if (!originalUrl) {
      throw new AppError("Url not found", 404);
    }
    res.redirect(originalUrl);
  } catch (error) {
    next(error);
  }
};

const getUserUrlsCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const urls = await getUserUrls(userId);
    res.status(200).json(urls);
  } catch (error) {
    next(error);
  }
};

const getAllUrlClicksCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const clicks = await getAllUrlClicks(id);
    res.status(200).json(clicks);
  } catch (error) {
    next(error);
  }
};

export {
  createShortUrlCtrl,
  getUserUrlsCtrl,
  redirectUrlCtrl,
  getAllUrlClicksCtrl,
};
