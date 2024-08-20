import { createPool } from "mysql2/promise";
import { CONFIG } from "../../config.js";


async function connectToDataBase() {
    try {
        const pool = createPool({
            host: CONFIG.app.database.host,
            user: CONFIG.app.database.user,
            password: CONFIG.app.database.password,
            port: CONFIG.app.database.port,
            database: CONFIG.app.database.database
        });

        console.log('Conexión exitosa a la base de datos.');
        return pool;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        // Aquí puedes lanzar un ValidationError o manejar el error de otra manera
        throw new validationError(error.message); // Ajusta esto según cómo quieras manejar el error
    }
}

export{ connectToDataBase}