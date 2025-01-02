import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { UpdateDataForCustomer } from "../domain/model/update-customer";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const updateCustomer =
  async (pool: mysql.Pool) =>
  async (data: Partial<UpdateDataForCustomer>): Promise<string | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);
    await queryData(
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
    const result = await executeQuery(
      "SELECT @o_state_code AS state, @o_response AS message"
    );
    const stateCode = result[0].state;
    const message: string = result[0].message;

    if (stateCode === 3) {
      forbiddenErrorResponse(message);
    } else if (stateCode === 2) {
      notFoundErrorResponse(message);
    } else {
      return message;
    }
  };
