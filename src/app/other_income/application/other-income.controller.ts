import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { response } from "../../../utilities/response";
import { DataInputOtheIncome } from "../domain/model/other-income";
import { registerOtherIncome } from "../infrastructure/other-income.mysql";

const pool = createPool();

export const postOtherIncome = async (req: Request, res: Response) => {
  const data: DataInputOtheIncome = req.body;
  const registerOtherIncomeFunc = await registerOtherIncome(pool);
  const otherIncome = await registerOtherIncomeFunc(data);
  response(res, 200, otherIncome, {});
};
