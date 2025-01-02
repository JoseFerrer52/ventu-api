import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";
import { checkTokenTemporary } from "../../../middelware/check_token_temporary/check-token";
import {
  validateUpadteBusiness,
  createFileUpadteBusinessValidation,
  createFormUpadteBusinessValidation,
} from "../../../middelware/validations/update-business-validation";
import {
  registerBusinessValidate,
  createFileRegisterBussinesValidation,
  createFormRegisterBusinessValidation,
} from "../../../middelware/validations/register-business-validation";
import { upload } from "../../../middelware/upload_file/upload-file";
import { createBusiness } from "./business.controller";
import { putBusiness } from "./business.controller";

const router = Router();

router.post(
  "/register-business",
  upload.single("file"),
  checkTokenTemporary(),
  registerBusinessValidate(
    createFormRegisterBusinessValidation,
    createFileRegisterBussinesValidation
  ),
  cachedAsync(createBusiness)
);

router.put(
  "/update-user",
  upload.single("file"),
  checkToken(),
  validateUpadteBusiness(
    createFormUpadteBusinessValidation,
    createFileUpadteBusinessValidation
  ),
  cachedAsync(putBusiness)
);

export default router;
