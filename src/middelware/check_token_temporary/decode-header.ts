import { unauthorizedErrorResponse } from "../../utilities/errors/error-unauthorized";
import { verifyToken } from "./verify-token";

function decodeHeader(req: any, userId: number) {
  const authorization = req.cookies.XSRF_TOKEN || "";
  if (!authorization) {
    unauthorizedErrorResponse("Token invalido");
  }
  const decoded = verifyToken(authorization, userId);

  req = decoded;

  return decoded;
}

export { decodeHeader };
