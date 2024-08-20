import { response } from "../../utilities/response.js";
import { productDelete, customerDelete } from "../../services/DB/query-database.js";

export const deleteProduct = async (req, res) => {
  const id = req.params.id
  const data = req.body

  const query = await productDelete(data) 

  response(res, 200, query, {});
};

export const deleteCustomer = async (req, res) => {
  const id = req.params.id
  const data = req.body

  const query = await customerDelete(data) 

  response(res, 200, query, {});
};
