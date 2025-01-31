import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { response } from "../../../utilities/response";
import {
  DataImputForConfirmEmail,
  DataImputForRefreshEmail,
} from "../domain/model/confirm-email";
import { confirmEmailUser } from "../infrastructure/confirm-email-services";
import { refreshEmailUser } from "../infrastructure/refresh-email-services";

const pool = createPool();

export const confirmMail = async (req: Request, res: Response) => {
  const data: DataImputForConfirmEmail = req.body;
  const confirmEmail = await confirmEmailUser(pool);
  const responseEmail = await confirmEmail(data);

  response(res, 200, responseEmail);
};

export const refreshMail = async (req: Request, res: Response) => {
  const data: DataImputForRefreshEmail = req.body;
  const refreshEmail = await refreshEmailUser(pool);
  const responseEmail = await refreshEmail(data);

  response(res, 200, responseEmail);
};
