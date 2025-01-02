import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataImputForSearchSale } from "../domain/model/sale";
import { OtherIncome } from "../domain/model/other-income";
import { cleanDataOtherIncome } from "../domain/clean-data-transaction";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const selectOtherIncome =
  async (pool: mysql.Pool) =>
  async (data: DataImputForSearchSale): Promise<OtherIncome | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    const rows = await queryData(
      "SELECT user_business_id FROM user_business WHERE user_id = ?",
      [data.userId]
    );

    if (rows[0].length === 0) {
      await pool.end();
      forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    }
    const result = await queryData(
      "SELECT user_business_id FROM other_incomes WHERE other_income_id = ?",
      [data.transactionId]
    );
    if (result[0].length === 0) {
      await pool.end();
      notFoundErrorResponse("Ingreso no encontrado.");
    }
    if (
      rows[0].user_business_id === data.userBusinessId &&
      result[0].user_business_id === data.userBusinessId
    ) {
      const rows = await executeQuery(
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

      const cleanData = await cleanDataOtherIncome(rows);

      const transaction: OtherIncome = { otherIncome: cleanData };

      await pool.end();
      return transaction;
    } else {
      await pool.end();
      forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    }
  };
