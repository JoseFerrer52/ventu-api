import { Response } from "express";

export const response = (
  res: Response,
  status: number,
  message: string | void,
  object: any
) => {
  res.status(status).json({
    error: false,
    status: status,
    message: message,
    object: object,
  });
};
