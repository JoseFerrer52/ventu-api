import { execute, query } from "../../../../data/mysql";
import mysql from "mysql2/promise";
import { encrypt } from "../../../../utilities/encrypt/encrypt";
import { sendEmail } from "../../../../services/api_mail_services/mail-services";
import { DataInputForSignUp } from "../domain/model/sign-up";
import { conflictErrorResponse } from "../../../../utilities/errors/error-conflict";
import { generaToken } from "../../../../auth/token_to_confirm_email";
import { addTokenToRegister } from "../domain/model/add-token-to-user";

export const resgiterUser =
  async (pool: mysql.Pool) =>
  async (
    data: DataInputForSignUp,
    userPassword: string
  ): Promise<string | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

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
    const result = await executeQuery(
      "SELECT @o_state_code AS state, @o_response AS res"
    );
    const stateCode = result[0].state;
    const message = result[0].res;

    console.log("this", message);

    if (stateCode === 4) {
      await pool.end();
      conflictErrorResponse(message);
    }
    if (stateCode === 0) {
      const userId = rows[0][0].user_id;
      console.log(userId);

      const token = generaToken({ userId });

      const encryptId = encrypt(userId.toString());
      const encryptToken = encrypt(token);

      try {
        await sendEmail({
          to: data.userEmail,
          subject: "Confirmacion de correo",
          text: "Contenido de prueba",
          html: `<H1>Confirmacion de Correo</H1>
          <p>Para confirmar su correo electronico haga click el en siguente enlace:<p/>
          <a href="http://localhost:3000/api/login/singIn/${encryptId}/${encryptToken}">link</a>`,
        });
        const responseEmail = "Correo enviado exitosamente";
        await pool.end();
        return responseEmail;
      } catch (error) {
        console.log(error);

        throw new Error("Ocurrio un error enviando el correo");
      }

      const dataToregister = await addTokenToRegister(rows[0], token);
      console.log("to this", dataToregister);
      return dataToregister;
    }
  };
