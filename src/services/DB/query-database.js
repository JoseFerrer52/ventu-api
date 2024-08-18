import { conectarABaseDeDatos } from "./database-connection.js";
import { validationErrorResponse } from "../../utilities/errors/error-validation.js";
import { notFoundErrorResponse } from "../../utilities/errors/error-not-found.js";
import { forbiddenErrorResponse } from "../../utilities/errors/error-forbidden.js";
import { conflictErrorResponse } from "../../utilities/errors/error-Conflict.js";
import { mergeBusinessData } from "../../controllers/adapters/adapter-transaction.js";
import { mergeUserData } from "../../controllers/adapters/adapter-regitersUser.js";
import { checkPassword } from "../../auth/check-password.js";

export const selectBusinessRubros = async () => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    `SELECT 
      business_rubro_id AS businessRubros,
      business_sector_category AS businessSectorCategory
      FROM business_rubros`
  );

  const businessRubros = { rubros: rows };
  await pool.end();
  return businessRubros;

};

export const resgitreUser = async (data, userPassword, businessLogo) => {
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_singup_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.firstName,
      data.lastName,
      data.userName,
      userPassword,
      data.userDateCreation,
      data.updateDate,
      data.sectorId,
      data.businessName,
      data.businessDateCreation,
      data.businessUpdateDate,
      data.businessDescription,
      businessLogo,
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS res"
  );
  const stateCode = result[0].state;
  const message = result[0].res;

  if (stateCode === 4) {
    await pool.end();
    conflictErrorResponse(message);
  }
  await pool.end();
  return message;
};

export const UpadteUser = async (data, userPassword, businessLogo) => {
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_update_business(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.firstName,
      data.lastName,
      data.userName,
      userPassword,
      data.updateDate,
      data.userBusinessId,
      data.sectorId,
      data.businessName,
      data.businessUpdateDate,
      data.description,
      businessLogo,
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS res"
  );
  const stateCode = result[0].state;
  const message = result[0].res;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const authUser = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "CALL sp_singin_user(?, @o_state_code, @o_response)",
    [data.userName]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 1) {
    await pool.end();
    validationErrorResponse(message);
  } else {
    const response = rows[0][0];
    const password = response.user_password;
    const id = response.user_id;
    const passwordAndToken = await checkPassword(data, password, id);
    
    const [result, fields] = await pool.execute(
    `SELECT
          u.user_id AS userId,
          u.first_name AS firstName,
          u.last_name AS lastName,
          ub.user_business_id AS userBusinessId,
          ub.business_name AS businessName,
          ub.business_logo AS businessLogo
      FROM
          users u
      INNER JOIN
        user_business ub ON u.user_id = ub.user_id
      WHERE
          u.user_id = ?`,[id]
    )
    const token = passwordAndToken
    const arrayMap = [result[0]]
    const mergedResult = await mergeUserData(arrayMap, token);
    const dataUser = {dataUser: mergedResult[0]}
    await pool.end();
    return dataUser;
  }
};

export const selectAllTransactions = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  if (rows[0].user_business_id === data.userBusinessId) {
    const [rows, fields] = await pool.execute(
      `
      SELECT
          i.income_id AS incomeId,
          i.type_transaction_id AS typeTransactionId,
          i.type_income_id AS typeIncomeId,
          tc.transaction_category AS typeTransaction,
          si.income_category AS typeIncome,
          sd.sale_details_id AS transactionId,
          sd.sale_date AS date,
          sd.sale_description AS description,
          sd.sale_amount AS amount,
          'venta' AS incomeType
      FROM
          incomes i
      INNER JOIN
        type_transaction tc ON i.type_transaction_id = tc.type_transaction_id
      INNER JOIN
          type_income si ON i.type_income_id = si.type_income_id
      LEFT JOIN
          sale_details sd ON i.income_id = sd.income_id
      WHERE
          i.user_business_id = ?
      
      UNION ALL
      
      SELECT
          i.income_id AS incomeId,
          i.type_transaction_id AS typeTransactionId,
          i.type_income_id AS typeIncomeId,
          tc.transaction_category AS typeTransaction,
          si.income_category AS typeIncome,
          oi.other_income_id AS transactionId,
          oi.incomes_date AS date,
          oi.income_description AS description,
          oi.income_amount AS amount,
          'otros' AS incomeType
      FROM
          incomes i
      INNER JOIN
        type_transaction tc ON i.type_transaction_id = tc.type_transaction_id
      INNER JOIN
          type_income si ON i.type_income_id = si.type_income_id
      LEFT JOIN
          other_incomes oi ON i.income_id = oi.income_id
      WHERE
          i.user_business_id = ?;
  `,
      [data.userBusinessId, data.userBusinessId]
    );

    const [result] = await pool.execute(
      ` 
    SELECT
          e.expenses_id AS expensesId,
          e.type_transaction_id AS typeTransactionId,
          tc.transaction_category AS typeTransaction,
          et.expenses_category AS typeExpenses,
          e.expenses_date AS date,
          e.expenses_description AS description,
          e.expenses_amount AS amount
    FROM
        expenses e
    INNER JOIN
        type_transaction tc ON e.type_transaction_id = tc.type_transaction_id
    INNER JOIN
        expenses_type et ON e.expenses_type_id = et.expenses_type_id 
    WHERE
          e.user_business_id = ?;`,
      [data.userBusinessId]
    );

    const mergedResult = await mergeBusinessData(rows);
    const transaction = { income: mergedResult, expense: result };
    await pool.end();
    return transaction;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectSale = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  const [result] = await pool.query(
    "SELECT user_business_id FROM sale_details WHERE sale_details_id = ?",
    [data.transactionId]
  );
  if (result.length === 0) {
    await pool.end();
    notFoundErrorResponse("Venta no encontrada.");
    return;
  }
  if (
    (rows[0].user_business_id === data.userBusinessId &&
      result[0].user_business_id === data.userBusinessId)
  ) {
    const [rows, fields] = await pool.execute(
      `
      SELECT
          i.income_id AS incomeId,
          si.income_category AS typeIncome,
          c.customer_name AS customerName,
          c.customer_phone AS customerPhone,
          c.customer_alias AS alias,
          its.item_quantity AS itemQuantity,
          p.product_image AS productImage,
          p.product_name AS productName,
          p.product_description AS productDescription,
          st.sale_category AS saleType,
          sd.sale_details_id AS transactionId,
          stp.sale_type_id AS saleTypeId,
          sd.sale_date AS date,
          sd.sale_description AS description,
          sd.sale_amount AS amount,
          'venta' AS incomeType
      FROM
          incomes i
      INNER JOIN
          type_income si ON i.type_income_id = si.type_income_id
      INNER JOIN
          sale_details sd ON i.income_id = sd.income_id
      INNER JOIN
          customers c ON c.customer_id = sd.customer_id
      INNER JOIN
          items_for_sales its ON its.item_sale_id = sd.item_sale_id
       INNER JOIN
          products p ON its.product_id = p.product_id
      INNER JOIN
          sale_registers stp ON stp.sale_register_id = sd.sale_register_id
      INNER JOIN
          sale_types st ON st.sale_type_id = stp.sale_type_id  
      WHERE
          sd.sale_details_id = ?`,
      [data.transactionId]
    );
    await pool.end();
    const transaction = { sale: rows[0] };
    return transaction;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectOtherIncome = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  const [result] = await pool.query(
    "SELECT user_business_id FROM other_incomes WHERE other_income_id = ?",
    [data.transactionId]
  );
  if (result.length === 0) {
    await pool.end();
    notFoundErrorResponse("Ingreso no encontrado.");
    return;
  }
  if (
    rows[0].user_business_id === data.userBusinessId &&
    result[0].user_business_id === data.userBusinessId
  ) {
    const [rows, fields] = await pool.execute(
      `
       SELECT
          i.income_id AS incomeId,
          si.income_category AS typeIncome,
          oi.other_income_id AS transactionId,
          oi.incomes_date AS date,
          oi.income_description AS description,
          oi.income_amount AS amount,
          oi.income_additional_note AS additionalNote,
          'otros' AS incomeType
      FROM
          incomes i
      INNER JOIN
          type_income si ON i.type_income_id = si.type_income_id
      INNER JOIN
          other_incomes oi ON i.income_id = oi.income_id
      WHERE
          oi.other_income_id = ?;
  `,
      [data.transactionId]
    );

    await pool.end();
    const transaction = { sale: rows[0] };
    return transaction;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectExpenses = async (data) => {
  console.log("here!!!", data.transactionId);
  
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  const [result] = await pool.query(
    "SELECT user_business_id FROM expenses WHERE expenses_id = ?",
    [data.transactionId]
  );
  if (result.length === 0) {
    await pool.end();
    notFoundErrorResponse("Egreso no encontrado.");
    return;
  }
  if (
    rows[0].user_business_id === data.userBusinessId &&
    result[0].user_business_id === data.userBusinessId
  ) {
    const [rows] = await pool.execute(
      ` 
      SELECT
            e.expenses_id AS expenseId,
            et.expenses_category AS typeExpenses,
            e.expenses_date AS date,
            e.expenses_description AS description,
            e.expenses_amount AS amount,
            e.expenses_additional_note AS additionalNote
      FROM
          expenses e
      INNER JOIN
          expenses_type et ON e.expenses_type_id = et.expenses_type_id 
      WHERE
            e.expenses_id = ?;`,
      [data.transactionId]
    );
    const transaction = { expenses: rows[0] };
    await pool.end();
    return transaction;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectAllSaleReceivable = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }

  if (rows[0].user_business_id === data.userBusinessId) {
    const [result] = await pool.query(
      "SELECT sale_receivable_id AS saleReceivableId, debt_status AS debtStatus, receivable_description AS receivableDescription, additional_note AS additionaNote, debt_amount AS debtAmount FROM sale_receivable WHERE user_business_id = ?",
      [data.userBusinessId]
    );

    const transaction = { saleReceivable: result };
    await pool.end();
    return transaction;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectSaleReceivable = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  const [result] = await pool.query(
    "SELECT user_business_id FROM sale_receivable WHERE sale_receivable_id = ?",
    [data.saleReceivableId]
  );
  if (result.length === 0) {
    await pool.end();
    notFoundErrorResponse("venta por cobrar no encontrada.");
    return;
  }
  if (
    rows[0].user_business_id === data.userBusinessId &&
    result[0].user_business_id === data.userBusinessId
  ) {
    const [rows, fields] = await pool.execute(
      `
        SELECT
            sr.sale_receivable_id AS transactionId,
            c.customer_name AS customerName,
            c.customer_phone AS customerPhone,
            c.customer_alias AS alias,
            its.item_quantity AS itemQuantity,
            p.product_image AS productImage,
            p.product_name AS productName,
            p.product_description AS productDescription,
            st.sale_category AS saleType,
            stp.sale_type_id AS saleTypeId,
            sr.debt_status AS status,
            sr.receivable_description AS description,
            sr.additional_note AS additionalNote,
            sr.debt_amount AS amount
        FROM
            sale_receivable sr
        INNER JOIN
            customers c ON c.customer_id = sr.customer_id
        INNER JOIN
            items_for_sales its ON its.item_sale_id = sr.item_sale_id
         INNER JOIN
            products p ON its.product_id = p.product_id
        INNER JOIN
            sale_registers stp ON stp.sale_register_id = sr.sale_register_id
        INNER JOIN
            sale_types st ON st.sale_type_id = stp.sale_type_id  
        WHERE
            sr.sale_receivable_id = ?`,
      [data.saleReceivableId]
    );

    const transaction = { saleReceivable: rows[0] };
    await pool.end();
    return transaction;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectAllCustomers = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }

  if (rows[0].user_business_id === data.userBusinessId) {
    const [result] = await pool.query(
      "SELECT customer_id AS customerId, customer_name AS customerName, customer_phone AS customerPhone, customer_alias AS customerAlias FROM customers WHERE user_business_id = ?",
      [data.userBusinessId]
    );

    const customers = { customers: result };
    await pool.end();
    return customers;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectCustomer = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );

  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  const [result] = await pool.query(
    "SELECT user_business_id, customer_active FROM customers WHERE customer_id = ?",
    [data.customerId]
  );
  if (result.length === 0 || result[0].customer_active === 0) {
    await pool.end();
    notFoundErrorResponse("Cliente no encontrado.");
    return;
  }

  if (rows[0].user_business_id === data.userBusinessId) {
    const [result] = await pool.query(
      "SELECT customer_id AS customerId, customer_name AS customerName, customer_phone AS customerPhone, customer_alias AS customerAlias FROM customers WHERE customer_id = ?",
      [data.customerId]
    );

    const customer = { customer: result[0] };
    await pool.end();
    return customer;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const updateCustomer = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "CALL sp_update_customer(?, ?, ?, ?, ?, ?,  @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      data.customerId,
      data.customerName,
      data.customerPhone,
      data.customerAlias,
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    forbiddenErrorResponse(message);
  } else if (stateCode === 2) {
    notFoundErrorResponse(message);
  } else {
    return message;
  }
};

export const customerDelete = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "CALL sp_delete_customer(?, ?, ?,  @o_state_code, @o_response)",
    [data.userId, data.userBusinessId, data.customerId]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    forbiddenErrorResponse(message);
  } else if (stateCode === 2) {
    notFoundErrorResponse(message);
  } else {
    return message;
  }
};

export const selectAllProducts = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );
  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  if (rows[0].user_business_id === data.userBusinessId) {
    const [result] = await pool.query(
      "SELECT product_id AS productId, product_image AS productImage, product_name AS productName, product_description AS productDescription FROM productS WHERE user_business_id = ?",
      [data.userBusinessId]
    );

    const products = { products: result };
    await pool.end();
    return products;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const selectProduct = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "SELECT user_business_id FROM user_business WHERE user_id = ?",
    [data.userId]
  );
  if (rows.length === 0) {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    return;
  }
  const [result] = await pool.query(
    "SELECT user_business_id, product_active FROM products WHERE product_id = ?",
    [data.productId]
  );
  if (result.length === 0 || result[0].product_active === 0) {
    await pool.end();
    notFoundErrorResponse("Producto no encontrado.");
    return;
  }
  if (rows[0].user_business_id === data.userBusinessId) {
    const [result] = await pool.query(
      "SELECT product_id AS productId, product_image AS productImage, product_name AS productName, product_description AS productDescription FROM products WHERE product_id = ?",
      [data.productId]
    );

    const product = { product: result[0] };
    await pool.end();
    return product;
  } else {
    await pool.end();
    forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
  }
};

export const registerproduct = async (data, productImage) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "CALL sp_create_product (?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      productImage,
      data.productName,
      data.productDescription,
      data.productAmount
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;
  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const updateProduct = async (data, productImage) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "CALL sp_update_product(?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      data.productId,
      productImage,
      data.productName,
      data.productDescription,
      data.productAmount
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else if (stateCode === 2) {
    await pool.end();
    notFoundErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const productDelete = async (data) => {
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(
    "CALL sp_delete_product(?, ?, ?, @o_state_code, @o_response)",
    [data.userId, data.userBusinessId, data.productId]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );

  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else if (stateCode === 2) {
    await pool.end();
    notFoundErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const selectTypeTransaction = async () =>{
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(`
    SELECT 
    type_transaction_id AS typeTransactionId,
    transaction_category AS transactionCategory
    FROM type_transaction`)

  const typeTransaction = { typeTransaction: rows };

  return typeTransaction;

}


export const selectTypeIncome = async () =>{
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(`
    SELECT 
    type_income_id AS typeIncomeId,
    income_category AS incomeCategory
    FROM type_income`)

  const typeIncome = { typeIncome: rows };

  return typeIncome;

}


export const selectSaleTypes = async () =>{
  const pool = await conectarABaseDeDatos();
  const [rows] = await pool.query(`
    SELECT 
    sale_type_id AS saleTypeId,
    sale_category AS saleCategory
    FROM sale_types`)

  const typeSale = { typeSale: rows };

  return typeSale;

}

export const resgiterSale = async (data) => {
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_create_sale(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      data.customerId,
      data.customerName,
      data.customerPhone,
      data.customerAlias,
      data.productId,
      data.typeTransactionId,
      data.typeIncomeId,
      data.saleTypeId,
      data.saleDate,
      data.saleDescription,
      data.saleAmount,
      data.intemQuantity,
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else if (stateCode === 2) {
    await pool.end();
    notFoundErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const resgiterSaleReceivable = async (data) => {
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_create_sale_receivable(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      data.customerId,
      data.customerName,
      data.customerPhone,
      data.customerAlias,
      data.productId,
      data.typeTransactionId,
      data.typeIncomeId,
      data.saleTypeId,
      data.saleDate,
      data.saleDescription,
      data.saleAmount,
      data.intemQuantity,
      data.receivableDescription,
      data.additionalNote,
      data.debtAmount,
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else if (stateCode === 2) {
    await pool.end();
    notFoundErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const registerCustomerPaymentReceivable = async (data) => {
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_create_customer_payment_receivable(?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      data.saleReceivableId,
      data.saleDate,
      data.receivableDescription,
      data.saleAmount,
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else if (stateCode === 2) {
    await pool.end();
    notFoundErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const registerOtherIncome = async (data) => {
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_create_other_incomes(?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      data.typeTransactionId,
      data.typeIncomeId,
      data.description,
      data.date,
      data.amount,
      data.additionalNote
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};

export const registerExpenses = async (data) => {
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_create_expenses(?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
    [
      data.userId,
      data.userBusinessId,
      data.typeTransactionId,
      data.expensesDescription,
      data.expensesDate,
      data.expensesAmount,
      data.expensesAdditionalNote,
    ]
  );
  const [result] = await pool.query(
    "SELECT @o_state_code AS state, @o_response AS message"
  );
  const stateCode = result[0].state;
  const message = result[0].message;

  if (stateCode === 3) {
    await pool.end();
    forbiddenErrorResponse(message);
  } else {
    await pool.end();
    return message;
  }
};
