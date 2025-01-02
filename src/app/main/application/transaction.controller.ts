import { response } from "../../../utilities/response";
import { Response, Request } from "express";
import { TransactionInput } from "../domain/model/all-transaction";
import { DataImputForSearchSale } from "../domain/model/sale";
import { createPool } from "../../../data/mysql";
import { getAllTransactions } from "../infrastructure/select-all-transaction.mysql";
import { selectSale } from "../infrastructure/select-sale.mysql.";
import { selectOtherIncome } from "../infrastructure/select-other-income.mysql.ts";
import { selectExpenses } from "../infrastructure/select-expense.mysql";
import { validationErrorResponse } from "../../../utilities/errors/error-validation";

const pool = createPool();

export const getAlltransaction = async (req: Request, res: Response) => {
  const data: TransactionInput = req.body;
  const getAllTransactionsFunc = await getAllTransactions(pool);

  const products = await getAllTransactionsFunc(data);

  response(res, 200, "ok", products);
};

export const getTransaction = async (req: Request, res: Response) => {
  const data: DataImputForSearchSale = req.body;

  if (data.typetransactionId === 1) {
    if (data.typeIncomeId === 1) {
      const selectSaleFunc = await selectSale(pool);
      const sale = await selectSaleFunc(data);
      response(res, 200, "ok", sale);
    } else if (data.typeIncomeId === 2) {
      const selectOtherIncomeFunc = await selectOtherIncome(pool);
      const otherIncome = await selectOtherIncomeFunc(data);
      console.log(otherIncome);

      response(res, 200, "ok", otherIncome);
    } else {
      validationErrorResponse("El tipo de transacción no exite");
    }
  } else if (data.typetransactionId === 2) {
    const selectExpenseFunc = await selectExpenses(pool);
    const expense = await selectExpenseFunc(data);
    response(res, 200, "ok", expense);
  } else {
    validationErrorResponse("El tipo de transacción no exite");
  }
};
