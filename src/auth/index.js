import jwt from "jsonwebtoken"
import { CONFIG } from "../config.js"

const secret = CONFIG.app.secret.jwt

function generaToken(data){
return jwt.sign(data, secret)

}


export {generaToken}