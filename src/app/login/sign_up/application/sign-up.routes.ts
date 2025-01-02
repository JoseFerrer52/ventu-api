import { Router } from "express";
import { cachedAsync } from "../../../../utilities/cached-async";
import {
  signUpvalidate,
  createSignUpValidation,
} from "../../../../middelware/validations/sign-up-validation";
import { signUp } from "./sign-up.controller";

const router = Router();

router.post(
  "/signUp",
  signUpvalidate(createSignUpValidation),
  cachedAsync(signUp)
);

export default router;
