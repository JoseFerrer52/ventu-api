import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";
import { postExpenses } from "./expenses.controller";
import {
  expensesValidate,
  createExpensesValidation,
} from "../../../middelware/validations/expenses-validation";

const router = Router();

router.post(
  "/register-expenses",
  checkToken(),
  expensesValidate(createExpensesValidation),
  cachedAsync(postExpenses)
);

export default router;
