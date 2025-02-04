import { execute } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { TypeRubros } from "../domain/model/type-rubro";

export const getBusinessRubros = async (
  pool: mysql.Pool
): Promise<TypeRubros> => {
  const executeQuery = execute(pool);

  const rows = await executeQuery(`
    SELECT 
      business_rubro_id AS businessRubrosId,
      business_sector_category AS businessSectorCategory
    FROM business_rubros
  `);

  const mappedRows = rows.map((row: any) => ({
    businessRubrosId: row.businessRubrosId,
    businessSectorCategory: row.businessSectorCategory,
  }));

  const businessRubros: TypeRubros = {
    message: "Transacción exitosa",
    object: mappedRows,
    token: "null",
  };

  await pool.end();
  return businessRubros;
};
