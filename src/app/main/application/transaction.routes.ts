import { Router } from "express";
import { checkToken } from "../../../middelware/check_token/check-token";
import {
  getAllTransactionValidation,
  getAllTransactionValidate,
} from "../../../middelware/validations/get-all-transaction-validation";
import {
  createGetTransactionValidation,
  getTransactionValidate,
} from "../../../middelware/validations/get-transaction-validation";
import { getAlltransaction, getTransaction } from "./transaction.controller";
import { cachedAsync } from "../../../utilities/cached-async";

const router = Router();

router.post(
  "/get-all-transaction",
  checkToken(),
  getAllTransactionValidate(getAllTransactionValidation),
  cachedAsync(getAlltransaction)
);

router.post(
  "/get-transaction",
  checkToken(),
  getTransactionValidate(createGetTransactionValidation),
  cachedAsync(getTransaction)
);

export default router;
