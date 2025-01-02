import { getToken } from "./get-token";
//import { Request } from "express";
import { verifyToken } from "./verify-token";

function decodeHeader(req: any) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verifyToken(token);

  req = decoded;

  return decoded;
}

export { decodeHeader };
