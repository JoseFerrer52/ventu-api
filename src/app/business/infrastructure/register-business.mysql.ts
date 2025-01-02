import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputForCreateBusiness,
  BussinessResponse,
} from "../domain/model/business";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { conflictErrorResponse } from "../../../utilities/errors/error-conflict";
import { generaToken } from "../../../auth/token";
import { addTokenToBusiness } from "../domain/add-token-to-user";

export const resgiterBusiness =
  async (pool: mysql.Pool) =>
  async (
    data: DataInputForCreateBusiness,
    businessLogo: string
  ): Promise<BussinessResponse | void> => {
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
    console.log("thiiiis", stateCode);

    if (stateCode === 2) {
      await pool.end();
      forbiddenErrorResponse(message);
    }
    if (stateCode === 4) {
      await pool.end();
      conflictErrorResponse(message);
    }
    if (stateCode === 0) {
      const data = rows[0][0];
      const userName = data.user_name;
      const userPassword = data.user_password;
      const id = data.user_id;
      const generaAToken = generaToken({ userName, userPassword, id });

      const fields = await executeQuery(
        `SELECT
            u.user_id AS userId,
            u.first_name AS firstName,
            u.last_name AS lastName,
            u.user_email AS userEmail,
            ub.user_business_id AS userBusinessId,
            ub.business_name AS businessName,
            ub.business_logo AS businessLogo
        FROM
            users u
        INNER JOIN
          user_business ub ON u.user_id = ub.user_id
        WHERE
            u.user_id = ?`,
        [id]
      );

      const token = generaAToken;
      const arrayMap = [fields[0]];
      console.log(arrayMap);

      const mergedResult = await addTokenToBusiness(arrayMap, token);
      const dataUser: BussinessResponse = { dataUser: mergedResult };

      await pool.end();
      return dataUser;
    }
  };
