import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputSaleReceivable,
  Transaction,
} from "../domain/model/get-sale-receivable";
import { cleanDataAllSaleReceivable } from "../domain/clean-data-sale-receivable";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const selectAllSaleReceivable =
  async (pool: mysql.Pool) =>
  async (data: DataInputSaleReceivable): Promise<Transaction | void> => {
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

    if (rows[0].user_business_id === data.userBusinessId) {
      const result = await executeQuery(
        "SELECT sale_receivable_id AS saleReceivableId, debt_status AS debtStatus, receivable_description AS receivableDescription, additional_note AS additionaNote, debt_amount AS debtAmount FROM sale_receivable WHERE user_business_id = ?",
        [data.userBusinessId]
      );

      const cleanData = await cleanDataAllSaleReceivable(result);

      const transaction = { saleReceivable: cleanData };
      await pool.end();
      return transaction;
    } else {
      await pool.end();
      forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    }
  };
