import { Request } from "express";
import { decodeHeader } from "./decode-header";
import { forbiddenErrorResponse } from "../../utilities/errors/error-forbidden";

export const validateToken = {
  confirmToken: function (req: Request, userId: number) {
    const decodeToken = decodeHeader(req);
    console.log("userIdNotMetter", userId);
    const decode = [decodeToken];

    const mappedRows = decode.map((decode: any) => ({
      userName: decode.userName,
      userPassword: decode.userPassword,
      id: decode.id,
      iat: decode.iat,
      exp: decode.exp,
    }));
    console.log("log aquiiiiiiiii", mappedRows);

    if (mappedRows[0].id !== userId) {
      throw forbiddenErrorResponse(
        "No tienes persmiso para realizar esta acción"
      );
    }
  },
};
