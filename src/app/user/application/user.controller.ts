import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { createPool } from "../../../data/mysql";
import { response } from "../../../utilities/response";
import { DataInputForUser } from "../domain/model/user";
import { UpadteUser } from "../infrastructure/user.mysql";

const pool = createPool();

export const putUser = async (req: Request, res: Response) => {
  const data: Partial<DataInputForUser> = req.body;

  if (!data.userPassword) {
    const UpadteUserFunc = await UpadteUser(pool);
    const user = await UpadteUserFunc(data, null);
    response(res, 200, user, {});
  } else {
    const encryp = await bcrypt.hash(data.userPassword, 10);
    const UpadteUserFunc = await UpadteUser(pool);
    const user = await UpadteUserFunc(data, encryp);
    response(res, 200, user, {});
  }
};
