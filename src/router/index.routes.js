import { Router } from "express";
import { upload } from "../controllers/middelware/upload-file.js";
import { singIn, singUp } from "../controllers/user_router_login_cotrollers/login-controllers.js";
import { postProducts, postSale, postSaleReceivable, postSaleCustomerPaymentReceivable, postOtherIncome, postExpenses } from "../controllers/user_router_controllers/post-user-router-controllers.js";
import { getAllProducts, getAllCustomers, getCustomer, getProduct, getAlltransaction, getTransaction, getAllSaleReceivable, getSaleReceivable, getRubros, getTypeTransaction, getTypeIncome, getSaleType } from "../controllers/user_router_controllers/get-user-roter-controllers.js";
import { putUser, putCustomer, putProduct } from "../controllers/user_router_controllers/put-user-controllers.js";
import { deleteProduct, deleteCustomer } from "../controllers/user_router_controllers/delete-user-router-controllers.js";
import { validate, createFileValidation, createFormValidation } from "../controllers/validations/singUp-validation.js";
import { singInValidate, createSingInValidation } from "../controllers/validations/singIn-validation.js";
import { productValidate, createProductValidation, createFileProductValidation } from "../controllers/validations/product-validation.js";
import { saleValidate, createSaleValidation } from "../controllers/validations/sale-validation.js";
import { saleReceivableValidate, createSaleReceivableValidation } from "../controllers/validations/sale-receivable-validation.js";
import { otherIncomeValidate, createOtherIncomeValidation } from "../controllers/validations/other-income-validation.js";
import { expensesValidate, createExpensesValidation } from "../controllers/validations/expenses-validation.js";
import { getAllTransactionValidate, getAllTransactionValidation } from "../controllers/validations/get-all-transaction-validation.js";
import { getTransactionValidate, createGetTransactionValidation } from "../controllers/validations/get-transaction-validation.js";
import { PaymentReceivableValidate, createPaymentReceivableValidation } from "../controllers/validations/register-payment-receivable-validation.js";
import { getCustomerValidate, createGetCustomerValidation } from "../controllers/validations/get-customer-validation.js";
import { GetProductValidate, createGetProductVaValidation } from "../controllers/validations/get-product-validation.js";
import { getSaleReceivableValidate, createGetSaleReceivableValidation } from "../controllers/validations/get-sale-receivable-validation.js";

import { cachedAsync } from "../utilities/cached-async.js";


const router = Router()

router.get("/rubros", cachedAsync(getRubros))

router.post("/singUp", upload.single("file"), validate(createFileValidation, createFormValidation), cachedAsync(singUp))

router.post("/singIn", singInValidate(createSingInValidation), cachedAsync(singIn))

router.put("/udate-user", upload.single("file"), cachedAsync(putUser))

router.post("/get-all-customers", getAllTransactionValidate(getAllTransactionValidation), cachedAsync(getAllCustomers))

router.post("/get-customer", getCustomerValidate(createGetCustomerValidation), cachedAsync(getCustomer))

router.put("/update-customer/", cachedAsync(putCustomer))

router.delete("/delete-customer/", getCustomerValidate(createGetCustomerValidation), cachedAsync(deleteCustomer))

router.post("/get-all-products", getAllTransactionValidate(getAllTransactionValidation), cachedAsync(getAllProducts))

router.post("/get-product", GetProductValidate(createGetProductVaValidation), cachedAsync(getProduct))

router.post("/register-product/", upload.single("file"), productValidate(createProductValidation, createFileProductValidation), cachedAsync(postProducts))

router.put("/update-product/", upload.single("file"), cachedAsync(putProduct))

router.delete("/delete-product/", GetProductValidate(createGetProductVaValidation), cachedAsync(deleteProduct))

router.get("/type-transaction", cachedAsync(getTypeTransaction))

router.get("/type-income", cachedAsync(getTypeIncome))

router.get("/type-sale", cachedAsync(getSaleType))

router.post("/register-sale",saleValidate(createSaleValidation), cachedAsync(postSale))

router.post("/register-sale-receivable", saleReceivableValidate(createSaleReceivableValidation), cachedAsync(postSaleReceivable))

router.post("/register-payment-receivable", PaymentReceivableValidate(createPaymentReceivableValidation), cachedAsync(postSaleCustomerPaymentReceivable))

router.post("/register-other-income", otherIncomeValidate(createOtherIncomeValidation), cachedAsync(postOtherIncome))

router.post("/register-expenses", expensesValidate(createExpensesValidation), cachedAsync(postExpenses))

router.post("/get-all-transaction", getAllTransactionValidate(getAllTransactionValidation), cachedAsync(getAlltransaction))

router.post("/get-transaction", getTransactionValidate(createGetTransactionValidation), cachedAsync(getTransaction))

router.post("/get-all-sale-receivable", getAllTransactionValidate(getAllTransactionValidation), cachedAsync(getAllSaleReceivable))

router.post("/get-sale-receivable", getSaleReceivableValidate(createGetSaleReceivableValidation), cachedAsync(getSaleReceivable))

export {router}