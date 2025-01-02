import { execute, query } from "../../../../data/mysql";
import mysql from "mysql2/promise";
import {
  DataInputSignIn,
  SignInResponse,
  SignInForRegisterBusiness,
} from "../domain/model/sign-in";
import { addTokenToUser } from "../domain/add-token-to-user";
import { checkPassword } from "../../../../auth/token/check-password";
import { generaToken } from "../../../../auth/token_to_register_user";
import { validationErrorResponse } from "../../../../utilities/errors/error-validation";

export const authUser =
  async (pool: mysql.Pool) =>
  async (
    data: DataInputSignIn
  ): Promise<SignInResponse | SignInForRegisterBusiness | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    const [rows] = await pool.query(
      "CALL sp_sign_in_user(?, @o_state_code, @o_response, @user_id_business)",
      [data.userName]
    );
    const result = await queryData(
      "SELECT @o_state_code AS state, @o_response AS message, @user_id_business AS businessExits"
    );
    const stateCode = result[0].state;
    const message = result[0].message;
    const businessExits = result[0].businessExits;
    console.log("businessExist log", businessExits);

    if (stateCode === 1) {
      await pool.end();
      validationErrorResponse(message);
    }
    if (businessExits === null) {
      const response = rows[0][0];
      const userName = data.userName;
      const userPassword = response.user_password;
      const userId = response.user_id;
      const registerBusiness = false;
      const token = generaToken({ userName, userPassword, userId });

      const mergedResult = [{ userId, registerBusiness, token }];
      const dataUser: SignInForRegisterBusiness = { dataUser: mergedResult };
      await pool.end();
      return dataUser;
    } else {
      const response = rows[0][0];
      const password = response.user_password;
      const id = response.user_id;

      console.log("log this", rows);

      const passwordAndToken = await checkPassword(data, password, id);

      const result = await executeQuery(
        `SELECT
            u.user_id AS userId,
            u.first_name AS firstName,
            u.last_name AS lastName,
            u.user_email AS userEmail,
            u.confirm_email AS confirmEmail,
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

      const token = passwordAndToken;
      const registerBusiness = true;
      const arrayMap = [result[0]];
      const mergedResult = await addTokenToUser(
        arrayMap,
        token,
        registerBusiness
      );
      const dataUser: SignInResponse = { dataUser: mergedResult };
      await pool.end();
      return dataUser;
    }
  };
