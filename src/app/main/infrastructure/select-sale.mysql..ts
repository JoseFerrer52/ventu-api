import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { SaleTransaction, DataImputForSearchSale } from "../domain/model/sale";
import { cleanDataSale } from "../domain/clean-data-transaction";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const selectSale =
  async (pool: mysql.Pool) =>
  async (data: DataImputForSearchSale): Promise<SaleTransaction> => {
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
        "SELECT user_business_id FROM sale_details WHERE sale_details_id = ?",
        [data.transactionId]
      );
      if (result[0].length === 2) {
        await pool.end();
        throw notFoundErrorResponse("Venta no encontrada.");
      }
      if (
        rows[0].user_business_id === data.userBusinessId &&
        result[0].user_business_id === data.userBusinessId
      ) {
        const result = await executeQuery(
          `
        SELECT
            i.income_id AS incomeId,
            si.income_category AS typeIncome,
            c.customer_name AS customerName,
            c.customer_phone AS customerPhone,
            c.customer_alias AS alias,
            its.item_quantity AS itemQuantity,
            p.product_image AS productImage,
            p.product_name AS productName,
            p.product_description AS productDescription,
            st.sale_category AS saleType,
            sd.sale_details_id AS transactionId,
            stp.sale_type_id AS saleTypeId,
            sd.sale_date AS date,
            sd.sale_description AS description,
            sd.sale_amount AS amount,
            'venta' AS incomeType
        FROM
            incomes i
        INNER JOIN
            type_income si ON i.type_income_id = si.type_income_id
        INNER JOIN
            sale_details sd ON i.income_id = sd.income_id
        INNER JOIN
            customers c ON c.customer_id = sd.customer_id
        INNER JOIN
            items_for_sales its ON its.item_sale_id = sd.item_sale_id
         INNER JOIN
            products p ON its.product_id = p.product_id
        INNER JOIN
            sale_registers stp ON stp.sale_register_id = sd.sale_register_id
        INNER JOIN
            sale_types st ON st.sale_type_id = stp.sale_type_id
        WHERE
            sd.sale_details_id = ?`,
          [data.transactionId]
        );

        const cleanData = await cleanDataSale(result);
        const sale: SaleTransaction = {
          message: "successful transaction",
          object: cleanData,
          token: data.token,
        };
        await pool.end();
        return sale;
      } else {
        await pool.end();
        throw forbiddenErrorResponse(
          "No tienes permiso para realizar esta acción."
        );
      }
    } catch (error) {
      return Promise.reject("error");
    }
  };
