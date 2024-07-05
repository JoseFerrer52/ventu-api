import { ForbiddenError } from "../class_error/class-forbidden-error.js";

function forbiddenErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new ForbiddenError(error);
}



export { forbiddenErrorResponse };