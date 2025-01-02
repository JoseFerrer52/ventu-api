import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { RegisterSaleReceivable } from "../domain/model/register-sale-receivable";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const resgiterSaleReceivable =
  async (pool: mysql.Pool) =>
  async (data: Partial<RegisterSaleReceivable>): Promise<string | void> => {
    console.log(data);
    const executeQuery = execute(pool);
    const queryData = query(pool);

    await queryData(
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
    const result = await executeQuery(
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
