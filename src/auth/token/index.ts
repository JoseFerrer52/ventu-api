import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/config";

const secret = CONFIG.app.secret.jwt;

function generaToken(data) {
  return jwt.sign(data, secret, { expiresIn: "1h" });
}

export { generaToken };
