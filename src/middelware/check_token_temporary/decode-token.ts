import { Request } from "express";
import { decodeHeader } from "./decode-header";
import { unauthorizedErrorResponse } from "../../utilities/errors/error-unauthorized";

export const validateToken = {
  confirmToken: function (req: Request, userId: number) {
    const decodeToken = decodeHeader(req);
    console.log("userIdNotMetter", userId);
    const decode = [decodeToken];

    const mappedRows = decode.map((decode: any) => ({
      userId: decode.userId,
      iat: decode.iat,
      exp: decode.exp,
    }));
    console.log("log aquiiiiiiiii", mappedRows);

    if (mappedRows[0].userId !== userId) {
      throw unauthorizedErrorResponse("Token invalido");
    }
  },
};
