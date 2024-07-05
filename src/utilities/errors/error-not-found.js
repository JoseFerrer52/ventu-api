import { ClientError } from "../class_error/class-error-not-found.js";

function notFoundErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new ClientError(error);
}



export { notFoundErrorResponse };