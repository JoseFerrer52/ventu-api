import express from "express";
import logger from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { resError } from "./utilities/resError.js";
//import { roter } from "./router/database.routes.js";
import { router } from "./router/index.routes.js";
export const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))




app.use(express.json())
app.use(logger("dev"))

app.use("/api", router)
// app.use((error, req, res, next) => {
//     console.log("aqui",error);
//     if (error.toJson === 'function') {
//       // Utiliza el método toJson de validationError para obtener una respuesta JSON
//       res.status(error.status).json(error.toJson());
//     } else {
//       // Para otros tipos de errores, puedes utilizar tu función resError existente
//       resError(res, error.status || 500, error.message, error.name, error.path);
//     }
//   });

  app.use((error, req, res, next)=>{
    const {status, message, path, name} = error
    resError(res, status, message, name, path)
  })