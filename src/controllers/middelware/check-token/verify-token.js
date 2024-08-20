import jwt from "jsonwebtoken"
import { CONFIG } from "../../../config.js"
import { UnauthorizedError } from "../../../utilities/class_error/class-error-unauthorized.js"
import { unauthorizedErrorResponse } from "../../../utilities/errors/error-unauthorized.js"
import { createSingInValidation } from "../../validations/singIn-validation.js"

const secret = CONFIG.app.secret.jwt

function verifyToken(token){
    try {
        return jwt.verify(token, secret)
        
    } catch (error) {
        
        return unauthorizedErrorResponse("Token invalido")
    }
    
        
  
}

export {verifyToken}