import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { response } from "../../../utilities/response";
import { DataInputDirectSale } from "../domain/model/direct-sale";
import { resgiterSale } from "../infrastructure/direct-sale.mysql";

const pool = createPool();

export const postSale = async (req: Request, res: Response) => {
  const data: Partial<DataInputDirectSale> = req.body;
  const resgiterSaleFunc = await resgiterSale(pool);
  const sale = await resgiterSaleFunc(data);

  response(res, 200, sale, {});
};
