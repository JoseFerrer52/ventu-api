import { conectarABaseDeDatos } from "../config.js";


 export const getRouterUser = async (req, res) => {
    const pool = await conectarABaseDeDatos()
 const [rows] = await pool.query('SELECT user_password FROM user')
 res.status(200).json(rows)
}