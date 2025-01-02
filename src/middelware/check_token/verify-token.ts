import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/config";
import { unauthorizedErrorResponse } from "../../utilities/errors/error-unauthorized";

const secret = CONFIG.app.secret.jwt;

function verifyToken(token: string) {
  try {
    const tokenDecode = jwt.verify(token, secret);
    return tokenDecode;
  } catch (error) {
    return unauthorizedErrorResponse("Token invalido");
  }
}

export { verifyToken };
