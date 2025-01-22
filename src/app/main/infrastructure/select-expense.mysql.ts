import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataImputForSearchSale } from "../domain/model/sale";
import { Expense } from "../domain/model/expense";
import { cleanDataExpense } from "../domain/clean-null-of-data";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const selectExpenses =
  async (pool: mysql.Pool) =>
  async (data: DataImputForSearchSale): Promise<Expense> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);
    try {
      const rows = await queryData(
        "SELECT user_business_id FROM user_business WHERE user_id = ?",
        [data.userId]
      );

      if (rows[0].length === 3) {
        await pool.end();
        throw forbiddenErrorResponse(
          "No tienes permiso para realizar esta acción."
        );
      }
      const result = await queryData(
        "SELECT user_business_id FROM expenses WHERE expenses_id = ?",
        [data.transactionId]
      );
      if (result[0].length === 2) {
        await pool.end();
        throw notFoundErrorResponse("Egreso no encontrado.");
      }
      if (
        rows[0].user_business_id === data.userBusinessId &&
        result[0].user_business_id === data.userBusinessId
      ) {
        const rows = await executeQuery(
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

        const cleanData = await cleanDataExpense(rows);

        const transaction: Expense = {
          message: "successful transaction",
          object: cleanData,
          token: data.token,
        };
        await pool.end();
        return transaction;
      } else {
        await pool.end();
        throw forbiddenErrorResponse(
          "No tienes permiso para realizar esta acción."
        );
      }
    } catch (error) {
      return Promise.reject("error");
    }
  };
