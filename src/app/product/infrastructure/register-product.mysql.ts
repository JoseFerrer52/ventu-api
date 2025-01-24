import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataForProduct, Product } from "../domain/model/product";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const registerproduct =
  async (pool: mysql.Pool) =>
  async (data: DataForProduct, productImage: String): Promise<Product> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
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
        throw forbiddenErrorResponse(message);
      } else {
        const product: Product = {
          message: message,
          object: null,
          token: data.token,
        };
        await pool.end();
        return product;
      }
    } catch {
      throw new Error("error");
    }
  };
