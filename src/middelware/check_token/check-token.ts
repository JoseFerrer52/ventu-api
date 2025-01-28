import { Response, Request, NextFunction } from "express";
import { validateToken } from "./decode-token";

function checkToken() {
  function middelware(req: Request, _res: Response, next: NextFunction) {
    const userId = Number(req.body.userId);

    const confirmToken = validateToken(req, userId);
    req.body.token = confirmToken;

    next();
  }

  return middelware;
}

export { checkToken };
