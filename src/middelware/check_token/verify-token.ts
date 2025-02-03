import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/config";
import { unauthorizedErrorResponse } from "../../utilities/errors/error-unauthorized";
import { forbiddenErrorResponse } from "../../utilities/errors/error-forbidden";

const secret = CONFIG.app.secret.jwt;

function verifyToken(token: string, userId: number) {
  try {
    const tokenDecode = jwt.verify(token, secret);
    console.log("userIdNotMetter", userId);
    const decode = [tokenDecode];

    const mappedRows = decode.map((decode: any) => ({
      userName: decode.userName,
      userPassword: decode.userPassword,
      userId: decode.userId,
      iat: decode.iat,
      exp: decode.exp,
    }));

    if (mappedRows[0].userId !== userId) {
      throw forbiddenErrorResponse(
        "No tienes persmiso para realizar esta acción"
      );
    } else {
      const data = {
        userName: mappedRows[0].userName,
        userPassword: mappedRows[0].userPassword,
        userId: mappedRows[0].userId,
      };
      const refreshToken = jwt.sign(data, secret, { expiresIn: "168h" });

      return refreshToken;
    }
  } catch (error) {
    return unauthorizedErrorResponse("Token invalido");
  }
}

export { verifyToken };
