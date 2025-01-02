import { UnauthorizedError } from "../class_error/class-error-unauthorized";

function unauthorizedErrorResponse(errorMessage: string) {
  const error = new Error(errorMessage);
  throw new UnauthorizedError(error);
}

export { unauthorizedErrorResponse };
