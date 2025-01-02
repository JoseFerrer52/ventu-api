import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataForProduct } from "../domain/model/product";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const registerproduct =
  async (pool: mysql.Pool) =>
  async (
    data: DataForProduct,
    productImage: String
  ): Promise<string | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);
    await queryData(
      "CALL sp_create_product (?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
      [
        data.userId,
        data.userBusinessId,
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
    } else {
      await pool.end();
      return message;
    }
  };
