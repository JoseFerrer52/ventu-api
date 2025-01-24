import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputForProduct,
  ProductResponse,
} from "../domain/model/all-products";
import { cleanDataProduct } from "../domain/clean-data-products";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const selectAllProducts =
  async (pool: mysql.Pool) =>
  async (data: DataInputForProduct): Promise<ProductResponse> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);
    try {
      const rows = await queryData(
        "SELECT user_business_id FROM user_business WHERE user_id = ?",
        [data.userId]
      );
      if (rows[0].length === 3) {
        await pool.end();
        forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
      }
      if (rows[0].user_business_id === data.userBusinessId) {
        const result = await executeQuery(
          "SELECT product_id AS productId, product_image AS productImage, product_name AS productName, product_description AS productDescription FROM productS WHERE user_business_id = ?",
          [data.userBusinessId]
        );
        const cleanData = await cleanDataProduct(result);
        const products: ProductResponse = {
          message: "Transacción exitosa",
          object: cleanData,
          token: data.token,
        };
        await pool.end();
        return products;
      } else {
        await pool.end();
        throw forbiddenErrorResponse(
          "No tienes permiso para realizar esta acción."
        );
      }
    } catch (error) {
      throw new Error("error");
    }
  };
