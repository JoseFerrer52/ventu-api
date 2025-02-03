import { Router } from "express";
import { checkToken } from "../../../middelware/check_token/check-token";
import { cachedAsync } from "../../../utilities/cached-async";
import {
  emailValidate,
  createEmailValidation,
} from "../../../middelware/validations/email-validation";
import {
  refreshEmailValidate,
  createRefreshEmailValidation,
} from "../../../middelware/validations/refresh-email-validation";
import { confirmMail, refreshMail } from "./mail.controller";

const router = Router();

router.post(
  "/confirm-mail",
  checkToken(),
  emailValidate(createEmailValidation),
  cachedAsync(confirmMail)
);
router.post(
  "/refresh-mail",
  checkToken(),
  refreshEmailValidate(createRefreshEmailValidation),
  cachedAsync(refreshMail)
);

export default router;
