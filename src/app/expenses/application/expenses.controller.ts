import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { response } from "../../../utilities/response";
import { DataInputForExpense } from "../domain/model/expense";
import { registerExpenses } from "../infrastructure/expenses.mysql";

const pool = createPool();

export const postExpenses = async (req: Request, res: Response) => {
  const data: DataInputForExpense = req.body;
  const registerExpensesFunc = await registerExpenses(pool);
  const expense = await registerExpensesFunc(data);
  response(res, 200, expense, {});
};
