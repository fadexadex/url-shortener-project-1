import { UrlRepository } from "../urlRepository/index.ts";
import { v4 as uuidv4 } from "uuid";
const geoip = require("geoip-lite");

const urlRepository = new UrlRepository();

const generateShortUrl = async (originalUrl: string, userId: number) => {
  const id: string = uuidv4().slice(0, 8);
  const shortUrl = `${process.env.BASE_URL}/${id}`;
  await urlRepository.createUrl({
    id,
    originalUrl,
    userId,
    shortUrl,
  });

  return shortUrl;
};

const getUserUrls = async (userId: number) => {
  return await urlRepository.getUserUrls(userId);
}

const getOriginalUrl = async (id: string, ipAddress: string) => {
  const location = geoip.lookup(ipAddress);
  const urlDetails = await urlRepository.getUrlById(id);
  if (!urlDetails) {
    return null;
  }

  await urlRepository.updateClicksAndLocation(id, location.country);
  return urlDetails.originalUrl;
};

const getAllUrlClicks = async (id: string) => {
  return await urlRepository.getUrlAllClicks(id);
};

export { generateShortUrl,getUserUrls, getOriginalUrl, getAllUrlClicks };
