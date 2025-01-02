import { sendEmail } from "../../../services/api_mail_services/mail-services";
import { DataImputForSendEmail } from "../domain/model/send-email";

export const sendEmailService = async (data: DataImputForSendEmail) => {
  try {
    await sendEmail({
      to: data.userEmail,
      subject: "Asunto Prueba",
      text: "Contenido de prueba",
      html: "<p>Contenido del correo en HTML</p>",
    });
    const responseEmail = "Correo enviado exitosamente";
    return responseEmail;
  } catch (error) {
    throw new Error("Ocurrio un error enviando el correo");
  }
};
