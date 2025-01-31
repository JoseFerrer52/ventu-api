import mysql from "mysql2/promise";
import { Pool, RowDataPacket } from "mysql2/promise";
import { CONFIG } from "../config/config";
import dontev from "dotenv";

dontev.config();

// Currificación de la creación del pool
export const createPool = () =>
  mysql.createPool({
    host: CONFIG.app.database.host,
    user: CONFIG.app.database.user,
    password: CONFIG.app.database.password,
    port: CONFIG.app.database.port,
    database: CONFIG.app.database.database,
  });

// Currificación de la ejecución de una consulta
export const query =
  (pool: mysql.Pool) => async (sql: string, params?: any[]) => {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (err) {
      throw new Error(`Error en la consulta: ${err.message}`);
    }
  };

// Currificación de la ejecución de una consulta específica para nuestro caso
export const execute =
  (pool: Pool) =>
  async (sql: string, params?: any[]): Promise<RowDataPacket[]> => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(sql, params);
      return rows;
    } catch (err) {
      throw new Error(`Error en la consulta: ${err.message}`);
    }
  };
