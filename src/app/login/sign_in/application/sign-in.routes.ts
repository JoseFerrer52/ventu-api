import { Router } from "express";
import { cachedAsync } from "../../../../utilities/cached-async";
import {
  singInValidate,
  createSingInValidation,
} from "../../../../middelware/validations/sign-in-validation";
import { signIn } from "./sign-in.controller";

const router = Router();

router.post(
  "/signin",
  singInValidate(createSingInValidation),
  cachedAsync(signIn)
);

export default router;
