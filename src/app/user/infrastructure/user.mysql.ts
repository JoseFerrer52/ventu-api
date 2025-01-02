import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataInputForUser } from "../domain/model/user";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const UpadteUser =
  async (pool: mysql.Pool) =>
  async (
    data: Partial<DataInputForUser>,
    userPassword: string
  ): Promise<string | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    await queryData(
      "CALL sp_update_user(?, ?, ?, ?, ?, ?,?, @o_state_code, @o_response)",
      [
        data.userId,
        data.firstName,
        data.lastName,
        data.userName,
        userPassword,
        data.updateDate,
        data.userEmail,
      ]
    );
    const result = await executeQuery(
      "SELECT @o_state_code AS state, @o_response AS res"
    );
    const stateCode = result[0].state;
    const message = result[0].res;

    if (stateCode === 3) {
      await pool.end();
      forbiddenErrorResponse(message);
    } else {
      await pool.end();
      return message;
    }
  };
