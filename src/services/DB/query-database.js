import { conectarABaseDeDatos } from "./database-connection.js";
import { validationErrorResponse } from "../../utilities/errors/error-validation.js";
import { notFoundErrorResponse } from "../../utilities/errors/error-not-found.js";
import { forbiddenErrorResponse } from "../../utilities/errors/error-forbidden.js";
import { conflictErrorResponse } from "../../utilities/errors/error-Conflict.js";
import { checkPassword } from "../../auth/check_password.js";

async function resgitreUser(data, userPassword) {
  const pool = await conectarABaseDeDatos()
  const {rows} = await pool.query("CALL sp_singup_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)", [data.firstName, data.lastName, data.userName, userPassword, data.userDateCreation, data.updateDate, data.sectorId, data.businessName, data.businessDateCreation, data.businessUpdateDate, data.description, data.businessLogo]) 
  const [result] = await pool.query("SELECT @o_state_code AS state, @o_response AS res");
  const stateCode = result[0].state;
  const message = result[0].res
  
    if (stateCode === 4) {
      conflictErrorResponse(message);
    }
}

async function UpadteUser(data, userPassword) {
  const pool = await conectarABaseDeDatos()
  const {rows} = await pool.query("CALL sp_update_business(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)", [data.userId, data.firstName, data.lastName, data.userName, userPassword, data.updateDate, data.userBusinessId, data.sectorId, data.businessName, data.businessUpdateDate, data.description, data.businessLogo])
  const [result] = await pool.query("SELECT @o_state_code AS state, @o_response AS res");
  const stateCode = result[0].state;
  const message = result[0].res
    
    if(stateCode === 3){
      forbiddenErrorResponse(message)
    }else{
      return message
    }
}

async function authUser(data){
  const pool = await conectarABaseDeDatos()
  const [rows] = await pool.query("CALL sp_singin_user(?, @o_state_code, @o_response)", [data.userName]);
  const [result] = await pool.query("SELECT @o_state_code AS state, @o_response AS message");
  const stateCode = result[0].state;
  const message = result[0].message;

    if (stateCode === 1) {
      validationErrorResponse(message);
}   else {
  const response = rows[0][0];
  const password = response.user_password;
  const id = response.user_id;
  const token = checkPassword(data, password, id);
  return token
  }  
}

async function selectCustomers (){
  const pool = await conectarABaseDeDatos();
  const [result] = await pool.query('SELECT * FROM customers WHERE user_business = ?', [date])
  con
  const response = result
  return response
}

async function selectCustomer (data, date){
  const pool = await conectarABaseDeDatos();
  const [result] = await pool.query('SELECT * FROM customers WHERE customer_id= ?', [data]);
  const customer = result[0];
  console.log(customer);
   if (customer === undefined) {
  //ejecutar error 404
}else{
  return customer
}
}

async function updateCustomer (data, id){
  const pool = await conectarABaseDeDatos()
  const [rows] = await pool.query('CALL sp_update_customer(?, ?, ?, ?, ?, ?,  @o_state_code, @o_response)', [data.userId, data.userBusinessId, id, data.customerName, data.customerPhone, data.customerAlias,]);
  const [result] = await pool.query('SELECT @o_state_code AS state, @o_response AS message');
  const stateCode = result[0].state;
  const message = result[0].message;

    if(stateCode === 3){
      forbiddenErrorResponse(message)
   }else if(stateCode === 2) {
      notFoundErrorResponse(message);
    }else{
      return message
   }
}

async function customerDelete(data, id){
  const pool = await conectarABaseDeDatos()
  const [rows] = await pool.query('CALL sp_delete_customer(?, ?, ?,  @o_state_code, @o_response)', [data.userId, data.userBusinessId, id,]);
  const [result] = await pool.query('SELECT @o_state_code AS state, @o_response AS message');
  const stateCode = result[0].state;
  const message = result[0].message;
  
    if(stateCode === 3){
      forbiddenErrorResponse(message)
    }else if(stateCode === 2) {
      notFoundErrorResponse(message);
    }else{
      return message
    }
}

async function selectProducts (){
    const pool = await conectarABaseDeDatos();
    const [rows] = await pool.query('SELECT * FROM products WHERE active =?', [1]);
    return rows;
}

async function selectProduct (data){
    const pool = await conectarABaseDeDatos();
  const [result] = await pool.query(
  'SELECT * FROM products WHERE product_id= ?', [data]);

  const product = result[0];
    if (product === undefined) {
    //ejecutar error 404
  }else{
    return product
  }
}

async function insertproducts (data){
  const pool = await conectarABaseDeDatos()
  const [rows] = await pool.query('CALL sp_create_product (?, ?, ?, ?, ?, @o_state_code, @o_response)', [data.userId, data.businessUserId, data.productImage, data.productName, data.productDescription])
  const [result] = await pool.query('SELECT @o_state_code AS state, @o_response AS message');
  const stateCode = result[0].state;
  const message = result[0].message;
   if (stateCode === 3) {
    forbiddenErrorResponse(message)
   } else{
     return message
  }
}

async function updateProducts (data, id){
  const pool = await conectarABaseDeDatos()
  const [rows] = await pool.query('CALL sp_update_product(?, ?, ?, ?, ?, ?, @o_state_code, @o_response)', [data.userId, data.businessUserId, id, data.productImage, data.productName, data.productDescription]);
  const [result] = await pool.query('SELECT @o_state_code AS state, @o_response AS message');
  const stateCode = result[0].state;
  const message = result[0].message;
   
    if(stateCode === 3){
      forbiddenErrorResponse(message)
    }else if(stateCode === 2) {
      notFoundErrorResponse(message);
    }else{
      return message
    }
}

async function productDelete(data, id){
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query('CALL sp_delete_product(?, ?, ?, @o_state_code, @o_response)',[data.userId, data.businessUserId, id]);
  const [result] = await pool.query('SELECT @o_state_code AS state, @o_response AS message');
  const stateCode = result[0].state;
  const message = result[0].message;

    if(stateCode === 3){
      forbiddenErrorResponse(message)
    }else if(stateCode === 2) {
      notFoundErrorResponse(message);
    }else{
      return message
    }
}

async function resgiterSale(data){
  const pool = await conectarABaseDeDatos()
  const {rows} = await pool.query('CALL sp_create_sale(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)',[data.userId, data.businessUserId, data.customerId, data.customerName, data.customerPhone, data.customerAlias, data.productId, data.saleTypeId, data.saleDate, data.saleDescription, data.saleAmount, data.intemQuantity])
  const [result] = await pool.query("SELECT @res AS res");
  const stateCode = result[0].state;
  const message = result[0].message;

  if(stateCode === 3){
    forbiddenErrorResponse(message)
  }else if(stateCode === 2) {
    notFoundErrorResponse(message);
  }else{
    return message
  }
}

async function resgitreSaleReceivable(data){
  const pool = await conectarABaseDeDatos()
  const {rows} = await pool.query('CALL sp_create_sale_receivable(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)',[data.userId, data.businessUserId, data.customerId, data.customerName, data.customerPhone, data.customerAlias, data.productId, data.saleTypeId, data.saleDate, data.saleDescription, data.saleAmount, data.intemQuantity, data.receivableDescription, data.additionalNote])
  const [result] = await pool.query("SELECT @res AS res");
  const stateCode = result[0].state;
  const message = result[0].message;

  if(stateCode === 3){
    forbiddenErrorResponse(message)
  }else if(stateCode === 2) {
    notFoundErrorResponse(message);
  }else{
    return message
  }
}

async function registerCustomerPaymentReceivable(data){
  const pool = await conectarABaseDeDatos()
  const {rows} = await pool.query('CALL sp_create_customer_payment_receivable(?, ?, ?, ?, ?, ?, @o_state_code,15 @o_response)',[data.userId, data.businessUserId, data.saleReceivableId, data.saleDate, data.receivableDescription, data.saleDescription, data.saleAmount])
  const [result] = await pool.query("SELECT @res AS res");
  const stateCode = result[0].state;
  const message = result[0].message;

  if(stateCode === 3){
    forbiddenErrorResponse(message)
  }else if(stateCode === 2) {
    notFoundErrorResponse(message);
  }else{
    return message
  }
}


async function registerOtherIncomes(data){
  const pool = await conectarABaseDeDatos()
  const {rows} = await pool.query('CALL sp_create_other_incomes(?, ?, ?, ?, ?, ?, @res)',[data.userId, data.businessUserId, data.description, data.date, data.amount, data.additionalNote])
  const [result] = await pool.query("SELECT @res AS res");
  const stateCode = result[0].state;
  const message = result[0].message;
 
  if (stateCode === 3) {
    forbiddenErrorResponse(message)
   } else{
     return message
  }
}

async function registerOtherExpenses(data){
  const pool = await conectarABaseDeDatos()
  const {rows} = await pool.query('CALL sp_create_expenses(?, ?, ?, ?, ?, ?, @res)',[data.userId, data.businessUserId, data.expensesDescription, data.expensesdate, data.expensesAmount, data.expensesAdditionalNote])
  const [result] = await pool.query("SELECT @res AS res");
  const stateCode = result[0].state;
  const message = result[0].message;
 
  if (stateCode === 3) {
    forbiddenErrorResponse(message)
   } else{
     return message
  }
}


export { resgitreUser, UpadteUser, authUser, selectCustomers, updateCustomer, customerDelete, selectCustomer,
       selectProducts, selectProduct, insertproducts, updateProducts, productDelete, resgiterSale, 
       resgitreSaleReceivable, registerCustomerPaymentReceivable, registerOtherIncomes  
}
