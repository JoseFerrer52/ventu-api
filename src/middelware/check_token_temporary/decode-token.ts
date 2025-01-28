import { Request } from "express";
import { decodeHeader } from "./decode-header";

export const validateToken = (req: Request, userId: number) => {
  const decodeToken = decodeHeader(req, userId);

  return decodeToken;
};
