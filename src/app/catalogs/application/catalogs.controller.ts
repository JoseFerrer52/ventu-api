import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { getBusinessRubros } from "../infrastructure/selec-rubros.mysql";
import { selectTypeTransaction } from "../infrastructure/select-transaction.mysql";
import { selectSaleTypes } from "../infrastructure/select-sale.mysql";
import { selectTypeIncome } from "../infrastructure/select-income.mysql";
import { response } from "../../../utilities/response";

const pool = createPool();

//export const selectRubros = getBusinessRubros(Pool);

export const getRubros = async (_req: Request, res: Response) => {
  const businessRubros = await getBusinessRubros(pool);

  response(res, 200, businessRubros);
};

export const getTypeTransaction = async (_req: Request, res: Response) => {
  const TypeTransaction = await selectTypeTransaction(pool);

  response(res, 200, TypeTransaction);
};

export const getSaleType = async (_req: Request, res: Response) => {
  const typeSale = await selectSaleTypes(pool);

  response(res, 200, typeSale);
};

export const getTypeIncome = async (_req: Request, res: Response) => {
  const typeIncome = await selectTypeIncome(pool);

  response(res, 200, typeIncome);
};
