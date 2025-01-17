import { Response, Request } from "express";
import { createPool } from "../../../../data/mysql";
import bcrypt from "bcrypt";
import { response } from "../../../../utilities/response";
import { DataInputForSignUp, SignUpResponse } from "../domain/model/sign-up";
import { resgiterUser } from "../infrastructure/sign-up.mysql";

const pool = createPool();

export const signUp = async (req: Request, res: Response) => {
  const data: DataInputForSignUp = req.body;

  const encryp = await bcrypt.hash(data.userPassword, 10);
interface DataInputForSign{
  responseEmail: string;
  userId: string;
  token: string;
} {
  const resgiterUserFunc = await resgiterUser(pool);
  const signInResponse = await resgiterUserFunc(data, encryp);
  const responseEmail: DataInputForSign = signInResponse


  response(res, 200, signInResponse);
};
