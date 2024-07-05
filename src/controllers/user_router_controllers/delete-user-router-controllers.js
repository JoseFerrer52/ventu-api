import { conectarABaseDeDatos } from "../../services/DB/database-connection.js";
import { response } from "../../utilities/response.js";
import { productDelete, customerDelete } from "../../services/DB/query-database.js";

export const deleteProduct = async (req, res) => {
  const id = req.params.id
  const data = req.body

  const result = await productDelete(data, id) 

  response(res, 200, result, {});
};

export const deleteCustomer = async (req, res) => {
  const id = req.params.id
  const data = req.body

  const result = await customerDelete(data, id) 

  response(res, 200, result, {});
};
