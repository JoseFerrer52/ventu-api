import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  RegisterSaleReceivable,
  paymentReceivable,
} from "../domain/model/register-sale-receivable";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const registerCustomerPaymentReceivable =
  async (pool: mysql.Pool) =>
  async (data: Partial<RegisterSaleReceivable>): Promise<paymentReceivable> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
      await queryData(
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
      const result = await executeQuery(
        "SELECT @o_state_code AS state, @o_response AS message"
      );
      const stateCode = result[0].state;
      const message = result[0].message;

      if (stateCode === 3) {
        await pool.end();
        throw forbiddenErrorResponse(message);
      } else if (stateCode === 2) {
        await pool.end();
        throw notFoundErrorResponse(message);
      } else {
        const paymentReceivable = {
          message: message,
          object: null,
          token: data.token,
        };
        await pool.end();
        return paymentReceivable;
      }
    } catch (error) {
      throw new Error("error");
    }
  };
