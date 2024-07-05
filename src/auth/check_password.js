import bcrypt from "bcrypt";
import { generaToken } from "./index.js";

async function checkPassword(data, password, id) {
  const match = await new Promise((resolve, reject) => {
    bcrypt.compare(data.userPassword, password, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  if (match) {
    // Generar un token
    const token = generaToken({ id });
    return token
  } else {
    const errorMessage = "Nombre de usurio o contraseña incorreta";
    validateResponse(errorMessage);
  }
}

  export {checkPassword}