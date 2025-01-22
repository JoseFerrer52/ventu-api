import { Request } from "express";
import { decodeHeader } from "./decode-header";
// import { forbiddenErrorResponse } from "../../utilities/errors/error-forbidden";

export const validateToken = {
  confirmToken: function (req: Request, userId: number) {
    const decodeToken = decodeHeader(req, userId);
    console.log("log desde validateToken", decodeToken);

    return decodeToken;
  },
};
