import bcrypt from "bcrypt";
import { uploadImageToServer } from "../../services/generate_image_link/upload-image-to-server.js";
import { response } from "../../utilities/response.js";
import { resgitreUser, authUser } from "../../services/DB/query-database.js";


export const singUp = async (req, res) => {
  const data = req.body
  const file = req.file

  const encryp = await bcrypt.hash(data.userPassword, 5);
  
  const image = await uploadImageToServer(file)

  const query = await resgitreUser(data, encryp, image)

  response(res, 200, query, {});
};

export const singIn = async (req, res) => {
  const data = req.body

  const query  = await authUser(data)

  response(res, 200, "ok", query );
};


