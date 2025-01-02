import bcrypt from "bcrypt";
import { generaToken } from ".";
import { DataInputSignIn } from "../../app/login/sign_in/domain/model/sign-in";
import { validationErrorResponse } from "../../utilities/errors/error-validation";

async function checkPassword(
  data: DataInputSignIn,
  password: string,
  id: number
): Promise<string> {
  const match = await new Promise((resolve, reject) => {
    bcrypt.compare(data.userPassword, password, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  if (match) {
    // Generar un token
    const token = generaToken({ ...data, id });
    return token;
  } else {
    const errorMessage = "Nombre de usurio o contraseña invalida.";
    validationErrorResponse(errorMessage);
    return errorMessage;
  }
}

export { checkPassword };
