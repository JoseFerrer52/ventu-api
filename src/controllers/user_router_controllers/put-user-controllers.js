import bcrypt from "bcrypt";
import { response } from "../../utilities/response.js";
import { uploadImageToServer } from "../../services/generate_image_link/upload-image-to-server.js";
import { updateProduct, updateCustomer, UpadteUser } from "../../services/DB/query-database.js";

export const putCustomer = async (req, res) => {
  const id = req.params.id
  const data = req.body
  
  const query = await updateCustomer(data)
  
   response(res, 200, query, {});
};


export const putProduct = async (req, res) => {
   const id = req.params.id
   const data = req.body
   const file = req.file
   
   if (!file) {
      const query = await updateProduct(data, file);
   } else {
      const productimage = await uploadImageToServer(file)
      const query = await updateProduct(data, productimage);
   }
   
    response(res, 200, query, {});
 };

 export const putUser = async (req, res) => {
   const data = req.body
   const file = req.file

   if (!data.userPassword) {
   
      const query = await UpadteUser(data);
   } else {
      const encryp = await bcrypt.hash(data.userPassword, 5);
      const query = await UpadteUser(data, encryp);
   }
   if(file){
      const businessLogo = await uploadImageToServer(file)
      console.log(businessLogo)
      const query = await UpadteUser(data ,null, businessLogo)
   }
    
   response(res, 200, "ok", {});
 };