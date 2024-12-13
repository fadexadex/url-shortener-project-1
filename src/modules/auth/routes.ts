import express from "express";
import { loginController, registerController } from "./controllers";
import {
  validateRegisterBody,
  validateLoginBody,
} from "../../middlewares/validators/validators";

const router = express.Router();

router.post("/register", validateRegisterBody, registerController);
router.post("/login", validateLoginBody, loginController);

export default router;
