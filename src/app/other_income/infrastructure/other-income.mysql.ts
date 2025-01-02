import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataInputOtheIncome } from "../domain/model/other-income";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const registerOtherIncome =
  async (pool: mysql.Pool) =>
  async (data: DataInputOtheIncome): Promise<string | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    await queryData(
      "CALL sp_create_other_incomes(?, ?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
      [
        data.userId,
        data.userBusinessId,
        data.typeTransactionId,
        data.typeIncomeId,
        data.description,
        data.date,
        data.amount,
        data.additionalNote,
      ]
    );
    const result = await executeQuery(
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
