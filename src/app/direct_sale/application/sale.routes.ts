import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";
import {
  saleValidate,
  createSaleValidation,
} from "../../../middelware/validations/sale-validation";
import { postSale } from "./sale.controller";

const router = Router();

router.post(
  "/register-sale",
  checkToken(),
  saleValidate(createSaleValidation),
  cachedAsync(postSale)
);

export default router;
