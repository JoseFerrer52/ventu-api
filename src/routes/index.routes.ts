import { Router } from "express";
import catalogsRoutes from "../app/catalogs/application/catalogs.routes";
import transactionRoutes from "../app/main/application/transaction.routes";
import customerRoutes from "../app/customer/application/custormer.routes";
import productRoutes from "../app/product/application/products.routes";
import saleReceivableRoutes from "../app/sale_receivable/application/sale-receivable.routes";
import saleRoutes from "../app/direct_sale/application/sale.routes";
import otherIncomeRoutes from "../app/other_income/application/other-income.routes";
import espenseRoutes from "../app/expenses/application/expenses.routes";
import userRoutes from "../app/user/application/user.routes";
import businessRoutes from "../app/business/application/business.routes";
import signUpRoutes from "../app/login/sign_up/application/sign-up.routes";
import signInRoutes from "../app/login/sign_in/application/sign-in.routes";
import emailRoutes from "../app/mail/application/mail.routes";
import logout from "../app/logout/application/logout.routes";
const router = Router();

router.use("/catalogs", catalogsRoutes);
router.use("/transaction", transactionRoutes);
router.use("/customer", customerRoutes);
router.use("/product", productRoutes);
router.use("/sale-receivable", saleReceivableRoutes);
router.use("/sale", saleRoutes);
router.use("/other-income", otherIncomeRoutes);
router.use("/expense", espenseRoutes);
router.use("/user", userRoutes);
router.use("/business", businessRoutes);
router.use("/login", signUpRoutes);
router.use("/login", signInRoutes);
router.use("/logout", logout);
router.use("/mail", emailRoutes);

export default router;
