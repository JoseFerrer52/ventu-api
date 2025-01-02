import { Response } from "express";

export const resError = (
  res: Response,
  status: number,
  message: string,
  name: string,
  path: string
) => {
  if (status === undefined) {
    res.status(500).json({
      error: true,
      status: 500,
      message: "Error Interno",
    });
  } else {
    res.status(status).json({
      error: true,
      status: status,
      message: message,
      name: name,
      path: path,
    });
  }
};
