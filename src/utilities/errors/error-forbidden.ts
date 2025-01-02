import { ForbiddenError } from "../class_error/class-forbidden-error";

function forbiddenErrorResponse(errorMessage: string) {
  const error = new Error(errorMessage);
  throw new ForbiddenError(error);
}

export { forbiddenErrorResponse };
