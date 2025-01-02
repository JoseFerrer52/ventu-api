import { ConflictError } from "../class_error/class-error-conflict";

function conflictErrorResponse(errorMessage: string) {
  const error = new Error(errorMessage);
  throw new ConflictError(error);
}

export { conflictErrorResponse };
