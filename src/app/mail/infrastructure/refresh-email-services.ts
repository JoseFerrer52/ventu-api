import mysql from "mysql2/promise";
import { authenticator } from "otplib";
import { query } from "../../../data/mysql";
import { generaToken } from "../../../auth/token";
import { sendEmail } from "../../../services/api_mail_services/mail-services";
import {
  confirmEmail,
  DataImputForRefreshEmail,
} from "../domain/model/confirm-email";

export const refreshEmailUser =
  async (pool: mysql.Pool) =>
  async (data: DataImputForRefreshEmail): Promise<confirmEmail> => {
    const queryData = query(pool);
    authenticator.options = { step: 300 }; // Token válido por 60 segundos
    const secret = authenticator.generateSecret();

    await queryData("UPDATE users SET secret_code = ? WHERE user_id = ?", [
      secret,
      data.userId,
    ]);
    const userId = data.userId;
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
    const responseEmail: confirmEmail = {
      message: "Codigo enviado a tu correo electrónico",
      object: null,
      token,
    };
    return responseEmail;
  };
