import { Response, Request } from "express";
import { createPool } from "../../../../data/mysql";
import bcrypt from "bcrypt";
import { response } from "../../../../utilities/response";
import { DataInputForSignUp } from "../domain/model/sign-up";
import { resgiterUser } from "../infrastructure/sign-up.mysql";

const pool = createPool();

export const signUp = async (req: Request, res: Response) => {
  const data: DataInputForSignUp = req.body;

  const encryp = await bcrypt.hash(data.userPassword, 5);

  const resgiterUserFunc = await resgiterUser(pool);
  const signUp = await resgiterUserFunc(data, encryp);

  response(res, 200, signUp, {});
};
