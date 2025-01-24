import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataInputForUser, User } from "../domain/model/user";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const UpadteUser =
  async (pool: mysql.Pool) =>
  async (
    data: Partial<DataInputForUser>,
    userPassword: string
  ): Promise<User> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
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
        throw forbiddenErrorResponse(message);
      } else {
        const user: User = {
          message: message,
          object: null,
          token: data.token,
        };
        await pool.end();
        return user;
      }
    } catch {
      throw new Error("error");
    }
  };
