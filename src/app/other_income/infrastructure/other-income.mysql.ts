import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataInputOtheIncome, OtherIncome } from "../domain/model/other-income";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const registerOtherIncome =
  async (pool: mysql.Pool) =>
  async (data: DataInputOtheIncome): Promise<OtherIncome> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
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
        throw forbiddenErrorResponse(message);
      } else {
        await pool.end();
        const otherSaleResponse: OtherIncome = {
          message: "Ingreso registrado con exito",
          object: null,
          token: data.token,
        };
        return otherSaleResponse;
      }
    } catch (error) {
      throw new Error("error");
    }
  };
