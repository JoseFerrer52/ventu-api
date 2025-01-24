import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";

import {
  getAllTransactionValidate,
  getAllTransactionValidation,
} from "../../../middelware/validations/get-all-transaction-validation";
import {
  GetProductValidate,
  createGetProductVaValidation,
} from "../../../middelware/validations/get-product-validation";
import {
  updateProductValidate,
  createFileUpdateProductValidation,
  createUpdateProductValidation,
} from "../../../middelware/validations/update-product-validation";
import {
  productValidate,
  createFileProductValidation,
  createProductValidation,
} from "../../../middelware/validations/product-validation";
import { upload } from "../../../middelware/upload_file/upload-file";
import {
  getAllProducts,
  getProduct,
  postProducts,
  putProduct,
  deleteProduct,
} from "./products.controller";

const router = Router();

router.post(
  "/register-product",
  upload.single("file"),
  checkToken(),
  productValidate(createProductValidation, createFileProductValidation),
  cachedAsync(postProducts)
);

router.post(
  "/get-all-products",
  checkToken(),
  getAllTransactionValidate(getAllTransactionValidation),
  cachedAsync(getAllProducts)
);

router.post(
  "/get-product",
  checkToken(),
  GetProductValidate(createGetProductVaValidation),
  cachedAsync(getProduct)
);

router.put(
  "/update-product",
  upload.single("file"),
  checkToken(),
  updateProductValidate(
    createUpdateProductValidation,
    createFileUpdateProductValidation
  ),
  cachedAsync(putProduct)
);

router.put(
  "/delete-product/",
  checkToken(),
  GetProductValidate(createGetProductVaValidation),
  cachedAsync(deleteProduct)
);

export default router;
