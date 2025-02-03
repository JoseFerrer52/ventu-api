import { execute, query } from "../../../../data/mysql";
import mysql from "mysql2/promise";
import { authenticator } from "otplib";
import { sendEmail } from "../../../../services/api_mail_services/mail-services";
import { SignUpResponse } from "../domain/model/sign-up";
import { DataInputForSignUp } from "../domain/model/sign-up";
import { conflictErrorResponse } from "../../../../utilities/errors/error-conflict";
import { generaToken } from "../../../../auth/token";
// import { addTokenToRegister } from "../domain/model/add-token-to-user";

export const registerUser =
  async (pool: mysql.Pool) =>
  async (
    data: DataInputForSignUp,
    userPassword: string
  ): Promise<SignUpResponse> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);
    authenticator.options = { step: 300 }; // Token válido por 60 segundos
    const secret = authenticator.generateSecret();

    const rows = await queryData(
      "CALL sp_sign_up_user(?, ?, ?, ?, ?, ?, ?,?, @o_state_code, @o_response)",
      [
        data.firstName,
        data.lastName,
        data.userName,
        userPassword,
        data.userDateCreation,
        data.updateDate,
        data.userEmail,
        secret,
      ]
    );

    const [result] = await executeQuery(
      "SELECT @o_state_code AS state, @o_response AS res"
    );
    if (result.state === 4) {
      throw conflictErrorResponse(result.res);
    }

    if (result.state === 0) {
      const userId = rows[0][0].user_id;
      const token = generaToken({ userId });
      const code = authenticator.generate(secret);

      await sendEmail({
        to: data.userEmail,
        subject: "Confirmación de correo electrónico",
        text: "Por favor, confirma tu correo electrónico utilizando el código proporcionado.",
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="text-align: center; color: #4CAF50;">Confirmación de correo electrónico</h2>
        <p>Hola,</p>
        <p>Gracias por registrarte. Para completar el registro, por favor confirma tu correo electrónico utilizando el siguiente código:</p>
        <p style="text-align: center; font-size: 24px; color: #4CAF50; border: 1px solid #4CAF50; border-radius: 5px; display: inline-block; padding: 10px 20px; letter-spacing: 2px;"><strong>${code}</strong></p>
        <p>Si no solicitaste esta confirmación de correo, simplemente ignora este mensaje.</p>
        <p>Gracias,</p>
        <p style="font-style: italic;">El equipo de [Tu Empresa]</p>
    </div>
    `,
      });

      const res: SignUpResponse = {
        message: result.res,
        object: userId,
        token: token,
      };
      return res;
    } else {
      return Promise.reject("error");
    }
  };
