import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputForCreateBusiness,
  BussinessResponse,
} from "../domain/model/business";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { conflictErrorResponse } from "../../../utilities/errors/error-conflict";
import { recordDataToUser } from "../domain/record-data-to-user";

export const resgiterBusiness =
  async (pool: mysql.Pool) =>
  async (
    data: DataInputForCreateBusiness,
    businessLogo: string
  ): Promise<BussinessResponse> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    const rows = await queryData(
      "CALL sp_register_business(?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
      [
        data.userId,
        data.sectorId,
        data.businessName,
        data.businessDateCreation,
        data.businessUpdateDate,
        data.businessDescription,
        businessLogo,
      ]
    );
    console.log("rows", rows);

    const result = await executeQuery(
      "SELECT @o_state_code AS state, @o_response AS res"
    );
    console.log(result);

    const stateCode = result[0].state;
    const message = result[0].res;

    if (stateCode === 2) {
      await pool.end();
      throw forbiddenErrorResponse(message);
    }
    if (stateCode === 4) {
      await pool.end();
      throw conflictErrorResponse(message);
    }
    if (stateCode === 0) {
      const fields = await executeQuery(
        `SELECT
            u.user_id AS userId,
            ub.user_business_id AS userBusinessId,
            ub.business_logo AS businessLogo
        FROM
            users u
        INNER JOIN
          user_business ub ON u.user_id = ub.user_id
        WHERE
            u.user_id = ?`,
        [data.userId]
      );
      const arrayMap = [fields[0]];
      console.log(arrayMap);

      const mergedResult = await recordDataToUser(arrayMap);
      const dataUser: BussinessResponse = {
        message: message,
        object: mergedResult,
        token: data.token,
      };

      await pool.end();
      return dataUser;
    } else {
      throw new Error("Ha ocurrido un error inesperado");
    }
  };
