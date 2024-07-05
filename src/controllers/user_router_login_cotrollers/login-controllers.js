import bcrypt from "bcrypt";
import { response } from "../../utilities/response.js";
import { resgitreUser, authUser } from "../../services/DB/query-database.js";


export const singUp = async (req, res) => {
  const params = req.body
  const {fName,lastName,userName,userPassword,date,updateDate,sectorId,businessName,businessDate,description,image,} = params
  const encryp = await bcrypt.hash(userPassword, 5);

  await resgitreUser(params, encryp)

  response(res, 200, "ok", {});
};

export const singIn = async (req, res) => {
  const data = req.body
  const { userName, userPassword } = data;
  const token  = await authUser(data)

  console.log( token);
response(res, 200, "ok", { token });
};


