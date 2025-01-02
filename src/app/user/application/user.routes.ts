import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middelware/check_token/check-token";
import {
  validateUpadteUser,
  createFormUpadteUserValidation,
} from "../../../middelware/validations/upadte-user-validation";
import { putUser } from "./user.controller";

const router = Router();

router.put(
  "/update-user",
  checkToken(),
  validateUpadteUser(createFormUpadteUserValidation),
  cachedAsync(putUser)
);

export default router;
