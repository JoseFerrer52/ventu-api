import { execute } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { TypeTransaction } from "../domain/model/type-transaction";

export const selectTypeTransaction = async (
  pool: mysql.Pool
): Promise<TypeTransaction> => {
  const executeQuery = execute(pool);

  const rows = await executeQuery(`
        SELECT 
        type_transaction_id AS typeTransactionId,
        transaction_category AS transactionCategory
        FROM type_transaction`);
  const mappedRows = rows.map((row: any) => ({
    typeTransactionId: row.typeTransactionId,
    transactionCategory: row.transactionCategory,
  }));
  const transaction: TypeTransaction = {
    message: "Transacción exitosa",
    object: mappedRows,
    token: "null",
  };

  return transaction;
};
