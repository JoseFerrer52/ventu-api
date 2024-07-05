import { Router } from "express";
import { singIn, singUp } from "../controllers/user_router_login_cotrollers/login-controllers.js";
import { postProducts } from "../controllers/user_router_controllers/post-user-router-controllers.js";
import { getAllProducts, getAllCustomers, getCustomer, getProduct } from "../controllers/user_router_controllers/get-user-roter-controllers.js";
import { putUser, putCustomer, putProduct } from "../controllers/user_router_controllers/put-user-controllers.js";
import { deleteProduct, deleteCustomer } from "../controllers/user_router_controllers/delete-user-router-controllers.js";
import { cachedAsync } from "../utilities/cached-async.js";


const router = Router()

router.post("/singUp", cachedAsync(singUp))
router.post("/singIn", cachedAsync(singIn))
router.put("/put-user", cachedAsync(putUser))
router.get("/get-all-customers/:id/:business", cachedAsync(getAllCustomers))
router.get("/get-customer/:id", cachedAsync(getCustomer))
router.put("/put-customer/:id", cachedAsync(putCustomer))
router.delete("/delete-customer/:id", cachedAsync(deleteCustomer))
router.get("/get-all-products", cachedAsync(getAllProducts))
router.get("/get-product/:id", cachedAsync(getProduct))
router.post("/post-product", cachedAsync(postProducts))
router.put("/put-product/:id", cachedAsync(putProduct))
router.delete("/delete-product/:id", cachedAsync(deleteProduct))

export {router}