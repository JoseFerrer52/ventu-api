import { Router } from "express";
import { singUp, singIn } from "../controllers/postControllers.js";
import { getRouterUser } from "../controllers/getControllers.js";
import { cachedAsync } from "../utilities/cachedAsync.js";


const router = Router()

router.get("/user",cachedAsync(getRouterUser))
router.post("/singUp", cachedAsync(singUp))
router.post("/singIn", cachedAsync(singIn))

export {router}