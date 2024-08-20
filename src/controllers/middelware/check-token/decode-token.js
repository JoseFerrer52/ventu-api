import { decodeHeader } from "./decode-header.js"
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden.js"


export const validateToken = {
    confirmToken: function (req, id) {
        const decodeToken = decodeHeader(req)

        if (decodeToken.id !== id){
            throw forbiddenErrorResponse("No tienes persmiso para realizar esta acción")
        }
    }
}