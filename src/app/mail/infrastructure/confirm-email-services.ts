import mysql from "mysql2/promise";
import { authenticator } from "otplib";
import { execute, query } from "../../../data/mysql";
import { generaToken } from "../../../auth/token";
import { validationErrorResponse } from "../../../utilities/errors/error-validation";
import {
  DataImputForConfirmEmail,
  confirmEmail,
} from "../domain/model/confirm-email";

export const confirmEmailUser =
  async (pool: mysql.Pool) =>
  async (data: DataImputForConfirmEmail): Promise<confirmEmail> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    const rows = await queryData(
      "SELECT secret_code FROM users WHERE user_id = ?",
      [data.userId]
    );

    const isValid = authenticator.check(data.code, rows[0].secret_code);
    if (isValid) {
      await executeQuery(
        "UPDATE users SET email_verified = 1 WHERE user_id = ?",
        [data.userId]
      );
      const userId = data.userId;
      const token = generaToken({ userId });
      const responseEmail: confirmEmail = {
        message: "Confirmación de correo exitosa",
        object: null,
        token,
      };
      return responseEmail;
    } else {
      throw validationErrorResponse("El código es inavlido");
    }
  };
