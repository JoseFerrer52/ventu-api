import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputForProduct,
  ProductResponse,
} from "../domain/model/all-products";
import { cleanDataProduct } from "../domain/clean-data-products";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const selectProduct =
  async (pool: mysql.Pool) =>
  async (data: DataInputForProduct): Promise<ProductResponse | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    const rows = await queryData(
      "SELECT user_business_id FROM user_business WHERE user_id = ?",
      [data.userId]
    );
    if (rows[0].length === 0) {
      await pool.end();
      forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    }
    const result = await queryData(
      "SELECT user_business_id, product_active FROM products WHERE product_id = ?",
      [data.productId]
    );
    if (result[0].length === 0 || result[0].product_active === 0) {
      await pool.end();
      notFoundErrorResponse("Producto no encontrado.");
      return;
    }
    if (rows[0].user_business_id === data.userBusinessId) {
      const result = await executeQuery(
        "SELECT product_id AS productId, product_image AS productImage, product_name AS productName, product_description AS productDescription FROM products WHERE product_id = ?",
        [data.productId]
      );

      const cleanData = await cleanDataProduct(result);
      const product: ProductResponse = { product: cleanData };
      await pool.end();
      return product;
    } else {
      await pool.end();
      forbiddenErrorResponse("No tienes permiso para realizar esta acción.");
    }
  };
