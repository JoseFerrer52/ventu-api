import { Router } from "express";
import { upload } from "../controllers/middelware/upload-file.js";
import { singIn, singUp } from "../controllers/user_router_login_cotrollers/login-controllers.js";
import { postProducts, postSale, postSaleReceivable, postSaleCustomerPaymentReceivable, postOtherIncome, postExpenses } from "../controllers/user_router_controllers/post-user-router-controllers.js";
import { getAllProducts, getAllCustomers, getCustomer, getProduct, getAlltransaction, getTransaction, getAllSaleReceivable, getSaleReceivable, getRubros, getTypeTransaction, getTypeIncome, getSaleType } from "../controllers/user_router_controllers/get-user-roter-controllers.js";
import { putUser, putCustomer, putProduct } from "../controllers/user_router_controllers/put-user-controllers.js";
import { deleteProduct, deleteCustomer } from "../controllers/user_router_controllers/delete-user-router-controllers.js";
import { cachedAsync } from "../utilities/cached-async.js";


const router = Router()

router.get("/rubros", cachedAsync(getRubros))

router.post("/singUp", upload.single("file"), cachedAsync(singUp))

router.post("/singIn", cachedAsync(singIn))

router.put("/udate-user", upload.single("file"), cachedAsync(putUser))

router.post("/get-all-customers", cachedAsync(getAllCustomers))

router.post("/get-customer", cachedAsync(getCustomer))

router.put("/update-customer/", cachedAsync(putCustomer))

router.delete("/delete-customer/", cachedAsync(deleteCustomer))

router.post("/get-all-products", cachedAsync(getAllProducts))

router.post("/get-product", cachedAsync(getProduct))

router.post("/register-product/", upload.single("file"), cachedAsync(postProducts))

router.put("/update-product/", upload.single("file"), cachedAsync(putProduct))

router.delete("/delete-product/", cachedAsync(deleteProduct))

router.get("/type-transaction", cachedAsync(getTypeTransaction))

router.get("/type-income", cachedAsync(getTypeIncome))

router.get("/type-sale", cachedAsync(getSaleType))

router.post("/register-sale", cachedAsync(postSale))

router.post("/register-sale-receivable", cachedAsync(postSaleReceivable))

router.post("/register-sale-customer-payment-receivable", cachedAsync(postSaleCustomerPaymentReceivable))

router.post("/register-other-income", cachedAsync(postOtherIncome))

router.post("/register-expenses", cachedAsync(postExpenses))

router.post("/get-all-transaction", cachedAsync(getAlltransaction))

router.post("/get-transaction", cachedAsync(getTransaction))

router.post("/get-all-sale-receivable", cachedAsync(getAllSaleReceivable))

router.post("/get-sale-receivable", cachedAsync(getSaleReceivable))

export {router}