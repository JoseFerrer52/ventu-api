import mysql from "mysql2/promise";
import { execute } from "../../../data/mysql";
import { TypeIncome } from "../domain/model/type-income";

export const selectTypeIncome = async (
  pool: mysql.Pool
): Promise<TypeIncome> => {
  const executeQuery = execute(pool);
  try {
    const rows = await executeQuery(`
        SELECT 
        type_income_id AS typeIncomeId,
        income_category AS incomeCategory
        FROM type_income`);

    console.log("aqui esta", rows);

    const mappedRows = rows.map((row: any) => ({
      typeIncomeId: row.typeIncomeId,
      incomeCategory: row.incomeCategory,
    }));

    console.log(mappedRows);

    const typeIncome: TypeIncome = {
      message: "Trasacción exitosa",
      object: mappedRows,
      token: "null",
    };
    return typeIncome;
  } catch (error) {
    throw new Error("error");
  }
};
