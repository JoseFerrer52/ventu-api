import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataInputForExpense, OtherIncome } from "../domain/model/expense";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const registerExpenses =
  async (pool: mysql.Pool) =>
  async (data: DataInputForExpense): Promise<OtherIncome> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
      await queryData(
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
          message: "Egreso registrado con exito",
          object: null,
          token: data.token,
        };
        return otherSaleResponse;
      }
    } catch (error) {
      throw new Error("error");
    }
  };
