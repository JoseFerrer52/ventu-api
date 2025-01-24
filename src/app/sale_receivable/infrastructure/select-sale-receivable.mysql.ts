import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputSaleReceivable,
  SaleReceivableResponse,
} from "../domain/model/get-sale-receivable";
import { cleanDataSaleReceivable } from "../domain/clean-data-sale-receivable";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const selectSaleReceivable =
  async (pool: mysql.Pool) =>
  async (data: DataInputSaleReceivable): Promise<SaleReceivableResponse> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
      const rows = await queryData(
        "SELECT user_business_id FROM user_business WHERE user_id = ?",
        [data.userId]
      );

      if (rows[0].length === 3) {
        await pool.end();
        throw forbiddenErrorResponse(
          "No tienes permiso para realizar esta acción."
        );
      }
      const result = await queryData(
        "SELECT user_business_id FROM sale_receivable WHERE sale_receivable_id = ?",
        [data.saleReceivableId]
      );
      if (result[0].length === 2) {
        await pool.end();
        throw notFoundErrorResponse("venta por cobrar no encontrada.");
      }
      if (
        rows[0].user_business_id === data.userBusinessId &&
        result[0].user_business_id === data.userBusinessId
      ) {
        const rows = await executeQuery(
          `
          SELECT
              sr.sale_receivable_id AS transactionId,
              c.customer_name AS customerName,
              c.customer_phone AS customerPhone,
              c.customer_alias AS alias,
              its.item_quantity AS itemQuantity,
              p.product_image AS productImage,
              p.product_name AS productName,
              p.product_description AS productDescription,
              st.sale_category AS saleType,
              stp.sale_type_id AS saleTypeId,
              sr.debt_status AS status,
              sr.receivable_description AS description,
              sr.additional_note AS additionalNote,
              sr.debt_amount AS amount
          FROM
              sale_receivable sr
          INNER JOIN
              customers c ON c.customer_id = sr.customer_id
          INNER JOIN
              items_for_sales its ON its.item_sale_id = sr.item_sale_id
           INNER JOIN
              products p ON its.product_id = p.product_id
          INNER JOIN
              sale_registers stp ON stp.sale_register_id = sr.sale_register_id
          INNER JOIN
              sale_types st ON st.sale_type_id = stp.sale_type_id
          WHERE
              sr.sale_receivable_id = ?`,
          [data.saleReceivableId]
        );
        const cleanData = await cleanDataSaleReceivable(rows);
        const saleReceivable = {
          message: "Transacción exitosa",
          object: cleanData,
          token: data.token,
        };
        await pool.end();
        return saleReceivable;
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
