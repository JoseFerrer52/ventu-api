import { response } from "../../utilities/response.js";
import { validationError } from "../../utilities/validationError.js";

function validateResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new validationError(error);
}



export { validateResponse };
