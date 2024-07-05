import { ConflictError } from "../class_error/class-error-conflict.js";

function conflictErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new ConflictError(error);
}



export { conflictErrorResponse };