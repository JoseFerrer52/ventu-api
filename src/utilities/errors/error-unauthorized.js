import { UnauthorizedError } from "../class_error/class-error-unauthorized.js";

function unauthorizedErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new UnauthorizedError(error);
}



export { unauthorizedErrorResponse };