import mysql from "mysql2/promise";
import { execute } from "../../../data/mysql";
import { TypeSale } from "../domain/model/type-sale";

export const selectSaleTypes = async (pool: mysql.Pool): Promise<TypeSale> => {
  const executeQuery = execute(pool);
  const rows = await executeQuery(`
      SELECT 
      sale_type_id AS saleTypeId,
      sale_category AS saleCategory
      FROM sale_types`);

  const mappedRows = rows.map((row: any) => ({
    saleTypeId: row.saleTypeId,
    saleCategory: row.saleCategory,
  }));

  const typeSale: TypeSale = { typeSale: mappedRows };

  return typeSale;
};
