import { Response, Request } from "express";
import { response } from "../../../utilities/response";

export const defaultRoot = async (_req: Request, res: Response) => {
  const message: string = "Welcome to Ventu's Api";
  response(res, 200, message, {});
};
