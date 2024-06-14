import bcrypt from "bcrypt";
import { conectarABaseDeDatos } from "../config.js";
import { validateResponse } from "../services/DB/dataBase.js";
import { response } from "../utilities/response.js";
import { generaToken } from "../auth/index.js";

export const singUp = async (req, res) => {
  const {
    fName,
    lastName,
    userName,
    userPassword,
    date,
    updateDate,
    sectorId,
    businessName,
    businessDate,
    description,
    image,
  } = req.body;
  const encryp = await bcrypt.hash(userPassword, 5);
  const pool = await conectarABaseDeDatos();
  const { rows } = await pool.query(
    "CALL sp_singup_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @res)",
    [
      fName,
      lastName,
      userName,
      encryp,
      date,
      updateDate,
      sectorId,
      businessName,
      businessDate,
      description,
      image,
    ]
  );

  const [result] = await pool.query("SELECT @res AS res");
  const message = result[0].res;

  if (message === "false") {
    const errorMessage = "El nombre de usuario ya ha sido registrado";
    validateResponse(errorMessage);
  }

  response(res, 200, message, {});
};

export const singIn = async (req, res) => {
  const { userName, userPassword } = req.body;
  const pool = await conectarABaseDeDatos();
  const [result] = await pool.query("CALL sp_singin_user(?)", [userName]);
  const data = result[0][0];
  const password = data.user_password;
  const message = data.result;
  const id = data.user_id;

  console.log(password);

  if (message === "false") {
    const errorMessage = "Nombre de usuario o contraseña incorrecta";
    validateResponse(errorMessage);
  } else {
    await checkUser(userPassword, password);
  }

  async function checkUser(userPassword, password) {
    const match = await new Promise((resolve, reject) => {
      bcrypt.compare(userPassword, password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (match) {
      // Generar un token
      const token = generaToken({ id });

      response(res, 200, "ok", { token });
    } else {
      const errorMessage = "Nombre de usurio o contraseña incorreta";
      validateResponse(errorMessage);
    }
  }
};
