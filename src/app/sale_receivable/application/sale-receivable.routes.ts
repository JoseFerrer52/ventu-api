import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";
import {
  getAllTransactionValidate,
  getAllTransactionValidation,
} from "../../../middelware/validations/get-all-transaction-validation";
import {
  getSaleReceivableValidate,
  createGetSaleReceivableValidation,
} from "../../../middelware/validations/get-sale-receivable-validation";
import {
  saleReceivableValidate,
  createSaleReceivableValidation,
} from "../../../middelware/validations/sale-receivable-validation";
import {
  PaymentReceivableValidate,
  createPaymentReceivableValidation,
} from "../../../middelware/validations/register-payment-receivable-validation";
import {
  getAllSaleReceivable,
  getSaleReceivable,
  postSaleReceivable,
  postSaleCustomerPaymentReceivable,
} from "./sale-receivable.controller";

const router = Router();

router.post(
  "/get-all-sale-receivable",
  checkToken(),
  getAllTransactionValidate(getAllTransactionValidation),
  cachedAsync(getAllSaleReceivable)
);

router.post(
  "/get-sale-receivable",
  checkToken(),
  getSaleReceivableValidate(createGetSaleReceivableValidation),
  cachedAsync(getSaleReceivable)
);

router.post(
  "/register-sale-receivable",
  checkToken(),
  saleReceivableValidate(createSaleReceivableValidation),
  cachedAsync(postSaleReceivable)
);

router.post(
  "/register-payment-receivable",
  checkToken(),
  PaymentReceivableValidate(createPaymentReceivableValidation),
  cachedAsync(postSaleCustomerPaymentReceivable)
);

export default router;
