import jwt from "jsonwebtoken"
import { config } from "../config.js"

const secret = config.app.secret.jwt

function generaToken(data){
return jwt.sign(data, secret)

}


export {generaToken}