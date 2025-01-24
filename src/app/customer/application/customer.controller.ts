import { response } from "../../../utilities/response";
import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { DataImputForCustomer } from "../domain/model/all-customer";
import { UpdateDataForCustomer } from "../domain/model/update-customer";
import { selectAllCustomers } from "../infrastructure/select-all-customer.mysql";
import { selectCustomer } from "../infrastructure/select-customer.mysql";
import { updateCustomer } from "../infrastructure/update-customer.mysql";
import { customerDelete } from "../infrastructure/delete-customer.mysql";

const pool = createPool();

export const getAllCustomers = async (req: Request, res: Response) => {
  const data: DataImputForCustomer = req.body;
  const selectAllCustomersFunc = await selectAllCustomers(pool);
  const customers = await selectAllCustomersFunc(data);
  response(res, 200, customers);
};

export const getCustomer = async (req: Request, res: Response) => {
  const data: DataImputForCustomer = req.body;
  const selectCustomerFunc = await selectCustomer(pool);

  const customer = await selectCustomerFunc(data);

  response(res, 200, customer);
};

export const putCustomer = async (req: Request, res: Response) => {
  const data: Partial<UpdateDataForCustomer> = req.body;
  const updateCustomerFunc = await updateCustomer(pool);
  const customer = await updateCustomerFunc(data);

  response(res, 200, customer);
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const data: DataImputForCustomer = req.body;

  const customerDeleteFunc = await customerDelete(pool);
  const customer = await customerDeleteFunc(data);

  response(res, 200, customer);
};
