import { unauthorizedErrorResponse } from "../../../utilities/errors/error-unauthorized.js"

function getToken (authorization) {
    
    if(!authorization){
        
        unauthorizedErrorResponse("Token invalido")
    }
    if(authorization.indexOf('Bearer') === -1){
        unauthorizedErrorResponse("Token invalido")
    }
    
    let token = authorization.replace('Bearer ', '')
return token
}

export {getToken}

