import { Response, Request, NextFunction } from "express";
import { validateToken } from "./decode-token";

function checkToken() {
  function middelware(req: Request, _res: Response, next: NextFunction) {
    const userId = Number(req.body.userId);

    validateToken.confirmToken(req, userId);

    console.log("log desde checkToken", validateToken.confirmToken);

    next();
  }
  console.log("log desde checkToken middelware", middelware);

  return middelware;
}

export { checkToken };
