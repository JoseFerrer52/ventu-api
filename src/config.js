import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import { validationError } from "./utilities/validationError.js";

dotenv.config();

const config ={
app: {
    secret: {
    jwt: process.env.JET_SECRET
}}
}
async function conectarABaseDeDatos() {
    try {
        const pool = createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: process.env.PORT,
            database: process.env.DATABASE
        });

        console.log('Conexión exitosa a la base de datos.');
        return pool;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        // Aquí puedes lanzar un ValidationError o manejar el error de otra manera
        throw new validationError(error.message); // Ajusta esto según cómo quieras manejar el error
    }
}


export {conectarABaseDeDatos,
    config
};
