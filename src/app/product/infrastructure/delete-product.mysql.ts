import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataInputForProduct } from "../domain/model/all-products";
import { Product } from "../domain/model/product";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const productDelete =
  async (pool: mysql.Pool) =>
  async (data: DataInputForProduct): Promise<Product> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
      await queryData(
        "CALL sp_delete_product(?, ?, ?, @o_state_code, @o_response)",
        [data.userId, data.userBusinessId, data.productId]
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
        const productDelete: Product = {
          message: message,
          object: null,
          token: data.token,
        };
        await pool.end();
        return productDelete;
      }
    } catch {
      throw new Error("error");
    }
  };
