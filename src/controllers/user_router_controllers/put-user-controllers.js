import bcrypt from "bcrypt";
import { response } from "../../utilities/response.js";
import { updateProduct, updateCustomer, UpadteUser } from "../../services/DB/query-database.js";

export const putCustomer = async (req, res) => {
  const id = req.params.id
  const data = req.body
   const query = await updateCustomer(data, id)
 
   
   response(res, 200, query, {});
};


export const putProduct = async (req, res) => {
   const id = req.params.id
   const data = req.body
    const query = await updateProduct(data, id)
  
    
    response(res, 200, query, {});
 };



 export const putUser = async (req, res) => {
   const data = req.body

   if (data.userPassword === null) {
      const query = await UpadteUser(data);
   } else {
      const encryp = await bcrypt.hash(data.userPassword, 5);
      const query = await UpadteUser(data, encryp);
   }

    response(res, 200, query, {});
 };