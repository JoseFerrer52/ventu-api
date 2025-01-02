import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";
import {
  otherIncomeValidate,
  createOtherIncomeValidation,
} from "../../../middelware/validations/other-income-validation";
import { postOtherIncome } from "./other-income.controller";

const router = Router();

router.post(
  "/register-other-income",
  checkToken(),
  otherIncomeValidate(createOtherIncomeValidation),
  cachedAsync(postOtherIncome)
);

export default router;
