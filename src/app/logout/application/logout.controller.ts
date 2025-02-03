import { Response, Request } from "express";

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("XSRF_TOKEN");
  res.status(200).json({
    error: false,
    status: 200,
    message: "Sesión cerrada correctamente",
    object: null,
  });
};
