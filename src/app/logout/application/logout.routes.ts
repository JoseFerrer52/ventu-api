import { Router } from "express";
import { checkToken } from "../../../middelware/check_token/check-token";
import { cachedAsync } from "../../../utilities/cached-async";
import { logout } from "./logout.controller";

const router = Router();

router.get("/logout", checkToken(), cachedAsync(logout));

export default router;
