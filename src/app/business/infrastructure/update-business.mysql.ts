import { execute, query } from "../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputForBusiness,
  BussinessResponse,
} from "../domain/model/business";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const UpadteBusiness =
  async (pool: mysql.Pool) =>
  async (
    data: Partial<DataInputForBusiness>,
    businessLogo: string
  ): Promise<BussinessResponse> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);
    try {
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
        throw forbiddenErrorResponse(message);
      }
      if (stateCode === 0) {
        const businessUpdate: BussinessResponse = {
          message: message,
          object: null,
          token: data.token,
        };
        await pool.end();
        return businessUpdate;
      } else {
        throw new Error("error");
      }
    } catch {
      throw new Error("error");
    }
  };
