import { execute, query } from "../../../data/mysql";
import {
  TransactionInput,
  AllTransaction,
} from "../domain/model/all-transaction";
import mysql from "mysql2/promise";
import {
  cleanDataIncome,
  cleanDataExpense,
} from "../domain/clean-null-of-data";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const getAllTransactions =
  async (pool: mysql.Pool) =>
  async (data: TransactionInput): Promise<AllTransaction | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    const rows = await queryData(
      "SELECT user_business_id FROM user_business WHERE user_id = ?",
      [data.userId]
    );

    console.log(rows);

    if (!Array.isArray(rows) || rows.length === 0) {
      await pool.end();
      forbiddenErrorResponse("No tienes permiso para realizar esta acción");
    }

    if (rows[0].user_business_id === data.userBusinessId) {
      const rows = await executeQuery(
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

      const result = await executeQuery(
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
      //console.log("aqui esta el log", rows);
      // console.log("aqui esta el log", result);

      const income = await cleanDataIncome(rows);
      //console.log("aqui esta tu income", income);

      const expense = await cleanDataExpense(result);
      const mergedResult = { income, expense };
      //console.log("aqui esta tu log del merge", mergedResult);

      const transaction: AllTransaction = { transaction: mergedResult };
      await pool.end();
      //console.log("trasactioon", transaction);

      return transaction;
    } else {
      await pool.end();
      forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    }
  };
