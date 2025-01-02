import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { getRubros } from "./catalogs.controller";
import { getTypeTransaction } from "./catalogs.controller";
import { getTypeIncome } from "./catalogs.controller";
import { getSaleType } from "./catalogs.controller";

const router = Router();

router.get("/rubros", cachedAsync(getRubros));

router.get("/type-transaction", cachedAsync(getTypeTransaction));

router.get("/type-income", cachedAsync(getTypeIncome));

router.get("/type-sale", cachedAsync(getSaleType));

export default router;
