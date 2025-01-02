import { Response, Request, NextFunction } from "express";
import { validateToken } from "./decode-token";

function checkTokenTemporary() {
  function middelware(req: Request, _res: Response, next: NextFunction) {
    const userId = Number(req.body.userId);

    validateToken.confirmToken(req, userId);

    next();
  }
  return middelware;
}

export { checkTokenTemporary };