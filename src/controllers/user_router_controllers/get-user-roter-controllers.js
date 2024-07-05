import { response } from "../../utilities/response.js";
import { selectProduct, selectProducts, selectCustomer, selectCustomers } from "../../services/DB/query-database.js";

export const getAllProducts = async (req, res) => {
  const data = req.params.id
  const date = req.params.business
  console.log(data);
  console.log(date);
  const products = await selectProducts();
  response(res, 200, "ok", products);
};

export const getProduct = async (req, res) => {
 const data = req.params.id
 const product = await selectProduct(data)

  response(res, 200, "ok", product);
};

export const getAllCustomers = async (req, res) => {
  const customers = await selectCustomers();
  response(res, 200, "ok", customers);
}

export const getCustomer = async (req, res) => {
  const data = req.params.id
  const customer = await selectCustomer(data)
 
   response(res, 200, "ok", customer);
 };