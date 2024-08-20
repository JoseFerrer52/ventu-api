import { UnauthorizedError } from "../../../utilities/class_error/class-error-unauthorized.js"
import { unauthorizedErrorResponse } from "../../../utilities/errors/error-unauthorized.js"
import { validateToken } from "./decode-token.js"


function checkToken() {
         function middelware(req, res, next) {
            const id = req.body.userId

         validateToken.confirmToken(req, id)
            
            next()

        }
 return middelware
}

export { checkToken }