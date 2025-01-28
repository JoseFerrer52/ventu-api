import { Response, Request } from "express";
import { createPool } from "../../../../data/mysql";
import bcrypt from "bcrypt";
import { response } from "../../../../utilities/response";
import { DataInputForSignUp } from "../domain/model/sign-up";
import { registerUser } from "../infrastructure/sign-up.mysql";

const pool = createPool();

export const signUp = async (req: Request, res: Response) => {
  const data: DataInputForSignUp = req.body;

  const encryp = await bcrypt.hash(data.userPassword, 10);
  const resgiterUserFunc = await registerUser(pool);

  const signUpResponse = await resgiterUserFunc(data, encryp);

  response(res, 200, signUpResponse);
};
