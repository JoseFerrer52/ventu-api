import { unauthorizedErrorResponse } from "../../utilities/errors/error-unauthorized";

function getToken(authorization: string) {
  if (!authorization) {
    unauthorizedErrorResponse("Token invalido");
  }
  if (authorization.indexOf("Bearer") === -1) {
    unauthorizedErrorResponse("Token invalido");
  }

  let token = authorization.replace("Bearer ", "");
  return token;
}

export { getToken };
