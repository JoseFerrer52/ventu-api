import nodemailer, { Transporter } from "nodemailer";
import { google } from "googleapis";
import { configApiMail } from "./account_transport";

const OAuth2 = google.auth.OAuth2;

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const createTransporter = async (): Promise<Transporter> => {
  console.log(configApiMail);

  const oauth2Client = new OAuth2(
    configApiMail.clientId,
    configApiMail.clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: configApiMail.refreshToken,
  });

  // Obtener el token de acceso
  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err || !token) {
        reject("Error al obtener el token de acceso");
      }
      resolve(token as string);
    });
  });

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: configApiMail.user,
      clientId: configApiMail.clientId,
      clientSecret: configApiMail.clientSecret,
      refreshToken: configApiMail.refreshToken,
      accessToken: accessToken,
    },
  });
};

const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<void> => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: configApiMail.user,
      to,
      subject,
      text,
      html,
    };

    return new Promise<void>((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        console.log("Correo enviado: " + info.response);
        resolve();
      });
    });
  } catch (emailError) {
    console.error("Error enviando email:", emailError);
    throw new Error("Ocurrió un error al enviar el correo electrónico");
  }
};
export { sendEmail };
