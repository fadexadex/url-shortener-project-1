import express from "express";
import {
  createShortUrlCtrl,
  getUserUrlsCtrl,
  getAllUrlClicksCtrl,
  redirectUrlCtrl,
} from "./controllers";
import {
  validateRedirectUrlParams,
  validateUrlCreationBody,
} from "../../middlewares/validators/validators";
import { authGuard } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/url/generate",
  authGuard,
  validateUrlCreationBody,
  createShortUrlCtrl
);

router.get("/:id", validateRedirectUrlParams, redirectUrlCtrl);

router.get("/url/urls", authGuard, getUserUrlsCtrl);
router.get("/url/:id/clicks", authGuard, getAllUrlClicksCtrl);

export default router;
