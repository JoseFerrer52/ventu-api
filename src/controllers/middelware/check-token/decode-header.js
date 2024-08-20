import { getToken } from "./get-token.js";
import { verifyToken } from "./verify-token.js";

function decodeHeader (req){
const authorization = req.headers.authorization || '';
const token = getToken(authorization)
const decoded = verifyToken(token)

req = decoded
console.log(decoded);


return decoded
}

export {decodeHeader}