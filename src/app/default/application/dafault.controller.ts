import { Response, Request } from "express";

export const defaultRoot = async (_req: Request, res: Response) => {
  const message = `
    <h1>Welcome to the default application</h1>`;
  res.send(message);
};
