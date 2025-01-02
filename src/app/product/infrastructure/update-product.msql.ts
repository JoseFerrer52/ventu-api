import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataForProduct } from "../domain/model/product";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const updateProduct =
  async (pool: mysql.Pool) =>
  async (
    data: Partial<DataForProduct>,
    productImage: string
  ): Promise<string | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    await queryData(
      "CALL sp_update_product(?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
      [
        data.userId,
        data.userBusinessId,
        data.productId,
        productImage,
        data.productName,
        data.productDescription,
        data.productAmount,
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
