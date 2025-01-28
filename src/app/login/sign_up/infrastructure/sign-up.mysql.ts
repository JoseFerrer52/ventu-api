import { execute, query } from "../../../../data/mysql";
import mysql from "mysql2/promise";
import { sendEmail } from "../../../../services/api_mail_services/mail-services";
import { SignUpResponse } from "../domain/model/sign-up";
import { DataInputForSignUp } from "../domain/model/sign-up";
import { conflictErrorResponse } from "../../../../utilities/errors/error-conflict";
import { generaToken } from "../../../../auth/token_to_register_user";
// import { addTokenToRegister } from "../domain/model/add-token-to-user";

export const registerUser =
  async (pool: mysql.Pool) =>
  async (
    data: DataInputForSignUp,
    userPassword: string
  ): Promise<SignUpResponse> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    try {
      const rows = await queryData(
        "CALL sp_sign_up_user(?, ?, ?, ?, ?, ?, ?, @o_state_code, @o_response)",
        [
          data.firstName,
          data.lastName,
          data.userName,
          userPassword,
          data.userDateCreation,
          data.updateDate,
          data.userEmail,
        ]
      );

      const [result] = await executeQuery(
        "SELECT @o_state_code AS state, @o_response AS res"
      );

      if (result[0].state === 4) {
        throw conflictErrorResponse("error");
      }

      if (result[0].state === 0) {
        const userId = rows[0][0].user_id;
        const token = generaToken({ userId });

        await sendEmail({
          to: data.userEmail,
          subject: "Confirmacion de correo",
          text: "Contenido de prueba",
          html: `<H1>Confirmacion de Correo</H1>
          <p>Para confirmar su correo electronico haga click el en siguente enlace:<p/>
          <a href="http://localhost:3000/api/login/singIn/">link</a>`,
        });

        const res: SignUpResponse = {
          message: "message",
          object: userId,
          token: token,
        };
        return res;
      } else {
        return Promise.reject("error");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      throw new Error("error");
    }
  };
