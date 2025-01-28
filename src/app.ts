import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import routerDefault from "./app/default/application/default.routes";
import router from "./routes/index.routes";
import { resError } from "./utilities/res-error";
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({}));
app.use(logger("dev"));
app.use(routerDefault);
app.use("/api", router);

interface ErrorResponse extends Error {
  status: number;
  message: string;
  path: string;
  name: string;
}

app.use(
  (error: ErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
    console.log(error);
    const { status, message, path, name } = error;
    resError(res, status, message, name, path);
  }
);
