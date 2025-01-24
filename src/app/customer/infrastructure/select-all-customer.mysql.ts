import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  CustomerResponse,
  DataImputForCustomer,
} from "../domain/model/all-customer";
import { cleanDataCustomer } from "../domain/clean-data-customer";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const selectAllCustomers =
  async (pool: mysql.Pool) =>
  async (data: DataImputForCustomer): Promise<CustomerResponse> => {
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

      if (rows[0].user_business_id === data.userBusinessId) {
        const result = await executeQuery(
          "SELECT customer_id AS customerId, customer_name AS customerName, customer_phone AS customerPhone, customer_alias AS customerAlias FROM customers WHERE user_business_id = ?",
          [data.userBusinessId]
        );

        const cleanData = await cleanDataCustomer(result);

        const customers: CustomerResponse = {
          message: "Transacción exitosa",
          object: cleanData,
          token: data.token,
        };
        await pool.end();
        return customers;
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
