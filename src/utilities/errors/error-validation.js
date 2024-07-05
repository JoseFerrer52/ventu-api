import { ValidationError } from "../class_error/class-validation-error.js";

function validationErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new ValidationError(error);
}



export { validationErrorResponse };
