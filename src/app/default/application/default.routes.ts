import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { defaultRoot } from "./dafault.controller";

const router = Router();

router.get("/", cachedAsync(defaultRoot));

export default router;
