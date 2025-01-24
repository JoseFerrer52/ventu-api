import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { response } from "../../../utilities/response";
import { DataInputSaleReceivable } from "../domain/model/get-sale-receivable";
import { RegisterSaleReceivable } from "../domain/model/register-sale-receivable";
import { selectAllSaleReceivable } from "../infrastructure/select-all-sale-receivable.mysql";
import { selectSaleReceivable } from "../infrastructure/select-sale-receivable.mysql";
import { resgiterSaleReceivable } from "../infrastructure/register-sale-receivable.mysql";
import { registerCustomerPaymentReceivable } from "../infrastructure/register-customer-payment-receivable.mysql";

const pool = createPool();

export const getAllSaleReceivable = async (req: Request, res: Response) => {
  const data: DataInputSaleReceivable = req.body;

  const selectAllSaleReceivableFunc = await selectAllSaleReceivable(pool);
  const saleReceivable = await selectAllSaleReceivableFunc(data);

  response(res, 200, saleReceivable);
};

export const getSaleReceivable = async (req: Request, res: Response) => {
  const data: DataInputSaleReceivable = req.body;

  const selectSaleReceivableFunc = await selectSaleReceivable(pool);
  const saleReceivable = await selectSaleReceivableFunc(data);

  response(res, 200, saleReceivable);
};

export const postSaleReceivable = async (req: Request, res: Response) => {
  const data: Partial<RegisterSaleReceivable> = req.body;

  const resgiterSaleReceivableFunc = await resgiterSaleReceivable(pool);
  const saleReceivable = await resgiterSaleReceivableFunc(data);

  response(res, 200, saleReceivable);
};

export const postSaleCustomerPaymentReceivable = async (
  req: Request,
  res: Response
) => {
  const data: Partial<RegisterSaleReceivable> = req.body;
  const registerCustomerPaymentReceivableFunc =
    await registerCustomerPaymentReceivable(pool);
  const saleReceivable = await registerCustomerPaymentReceivableFunc(data);
  response(res, 200, saleReceivable);
};
