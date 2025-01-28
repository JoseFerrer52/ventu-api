import { Response } from "express";

export const response = (
  res: Response,
  status: number,
  serRes: {
    message: string;
    object: any;
    token: string;
  }
) => {
  res.cookie("XSRF_TOKEN", serRes.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(status).json({
    error: false,
    status: status,
    message: serRes.message,
    object: serRes.object,
  });
};
