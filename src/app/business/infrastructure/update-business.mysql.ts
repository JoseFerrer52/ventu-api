import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import { DataInputForBusiness } from "../domain/model/business";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const UpadteBusiness =
  async (pool: mysql.Pool) =>
  async (
    data: Partial<DataInputForBusiness>,
    businessLogo: string
  ): Promise<string | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    await queryData(
      "CALL sp_update_business(?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
      [
        data.userId,
        data.userBusinessId,
        data.sectorId,
        data.businessName,
        data.businessUpdateDate,
        data.description,
        businessLogo,
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
