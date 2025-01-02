import { ClientError } from "../class_error/class-error-not-found";

function notFoundErrorResponse(errorMessage: string) {
  const error = new Error(errorMessage);
  throw new ClientError(error);
}

export { notFoundErrorResponse };
