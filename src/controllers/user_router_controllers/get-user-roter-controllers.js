import { response } from "../../utilities/response.js";
import { validationErrorResponse } from "../../utilities/errors/error-validation.js";
import { selectProduct, selectAllProducts, selectCustomer, selectAllCustomers, selectAllTransactions, selectExpenses, selectSale, selectOtherIncome, selectAllSaleReceivable, selectSaleReceivable, selectBusinessRubros, selectTypeTransaction, selectTypeIncome, selectSaleTypes } from "../../services/DB/query-database.js";



export const getRubros = async (req, res) => {

  const businessRubros = await selectBusinessRubros();

  response(res, 200, "ok", businessRubros);
};

export const getTypeTransaction = async (req, res) => {

const TypeTransaction = await selectTypeTransaction();

response(res, 200, "ok", TypeTransaction);
};

export const getSaleType = async (req, res) => {

  const typeSale = await selectSaleTypes()

  response(res, 200, "ok", typeSale);

}

export const getTypeIncome = async (req, res) => {

  const typeIncome = await selectTypeIncome()

  response(res, 200, "ok", typeIncome);

}

export const getAlltransaction = async (req, res) => {
  const userid = req.params.id
  const data = req.body

  const products = await selectAllTransactions(data);
  response(res, 200, "ok", products);
};

export const getTransaction = async (req, res) => {
  const userId = req.params.id
  const userBusinessId = parseInt(req.params.business)
  const transactionId = req.params.transaction
  const data = req.body
 
  if(data.typetransactionId === 1){
   
   if(data.typeIncomeId === 1){
    const query = await selectSale(data)
    response(res, 200, "ok", query);
  }  else if(data.typeIncomeId === 2){
      const query = await selectOtherIncome(data)
      response(res, 200, "ok", query);
    }else{
      validationErrorResponse("El tipo de transacción no exite")
    }
  }else if(data.typetransactionId === 2){
    const query = await selectExpenses(data)
    response(res, 200, "ok", query);
  }else{
    validationErrorResponse("El tipo de transacción no exite")
  }
};

export const getAllSaleReceivable = async (req, res) => {
  const userId = req.params.id
  const userBusinessId = parseInt(req.params.business)
  const data = req.body
 
  const query = await selectAllSaleReceivable(data)
  response(res, 200, "ok", query);
};


export const getSaleReceivable = async (req, res) => {
  const userId = req.params.id
  const userBusinessId = parseInt(req.params.business)
  const transactionId = req.params.transaction
  const data = req.body

  const query = await selectSaleReceivable(data)

  response(res, 200, "ok", query);
};



export const getAllProducts = async (req, res) => {
  const userId = req.params.id
  const userBusinessId = parseInt(req.params.business)
  const data = req.body
  
  const products = await selectAllProducts(data);
  response(res, 200, "ok", products);
};

export const getProduct = async (req, res) => {
  const userId = req.params.id
  const userBusinessId = parseInt(req.params.business)
  const productId = req.params.product
  const data = req.body

 const product = await selectProduct(data)

  response(res, 200, "ok", product);
};

export const getAllCustomers = async (req, res) => {
  const userId = req.params.id
  const userBusinessId = parseInt(req.params.business)
  const data = req.body
  const customers = await selectAllCustomers(data);
  response(res, 200, "ok", customers);
}

export const getCustomer = async (req, res) => {
  const userId = req.params.id
  const userBusinessId = parseInt(req.params.business)
  const customerId = req.params.customer
  const data = req.body
  const customer = await selectCustomer(data);
 
   response(res, 200, "ok", customer);
 };
