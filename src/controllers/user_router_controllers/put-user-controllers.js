import bcrypt from "bcrypt";
import { response } from "../../utilities/response.js";
import { updateProducts, updateCustomer, UpadteUser } from "../../services/DB/query-database.js";

export const putCustomer = async (req, res) => {
  const id = req.params.id
  const data = req.body
   const result = await updateCustomer(data, id)
 
   
   response(res, 200, "ok", result);
};


export const putProduct = async (req, res) => {
   const id = req.params.id
   const data = req.body
    const result = await updateProducts(data, id)
  
    
    response(res, 200, result, {});
 };



 export const putUser = async (req, res) => {
   const data = req.body

   if (data.userPassword === null) {
      const result = await UpadteUser(data);
   } else {
      const encryp = await bcrypt.hash(data.userPassword, 5);
      const result = await UpadteUser(data, encryp);
   }

    response(res, 200, result, {});
 };