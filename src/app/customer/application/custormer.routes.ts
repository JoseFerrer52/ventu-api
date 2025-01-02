import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";
import {
  getAllTransactionValidate,
  getAllTransactionValidation,
} from "../../../middelware/validations/get-all-transaction-validation";
import {
  getCustomerValidate,
  createGetCustomerValidation,
} from "../../../middelware/validations/get-customer-validation";
import {
  updateCustomerValidate,
  createUpdateCustomerValidation,
} from "../../../middelware/validations/update-customer-validation";
import {
  getAllCustomers,
  deleteCustomer,
  getCustomer,
  putCustomer,
} from "./customer.controller";

const router = Router();

router.post(
  "/get-all-customers",
  checkToken(),
  getAllTransactionValidate(getAllTransactionValidation),
  cachedAsync(getAllCustomers)
);

router.post(
  "/get-customer",
  checkToken(),
  getCustomerValidate(createGetCustomerValidation),
  cachedAsync(getCustomer)
);

router.put(
  "/update-customer",
  checkToken(),
  updateCustomerValidate(createUpdateCustomerValidation),
  cachedAsync(putCustomer)
);

router.put(
  "/delete-customer/",
  checkToken(),
  getCustomerValidate(createGetCustomerValidation),
  cachedAsync(deleteCustomer)
);
export default router;
