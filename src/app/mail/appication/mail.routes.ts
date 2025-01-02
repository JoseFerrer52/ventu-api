import { Router } from "express";
import { checkToken } from "../../../middelware/check_token/check-token";
import { cachedAsync } from "../../../utilities/cached-async";
import {
  emailValidate,
  createEmailValidation,
} from "../../../middelware/validations/email-validation";
import { sendMail } from "./mail.controller";

const router = Router();

router.post(
  "/send-mail/:id/:token",
  checkToken(),
  emailValidate(createEmailValidation),
  cachedAsync(sendMail)
);

export default router;
