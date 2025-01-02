import { ValidationError } from "../class_error/class-validation-error";

function validationErrorResponse(errorMessage: string) {
  const error = new Error(errorMessage);
  throw new ValidationError(error);
}

export { validationErrorResponse };
