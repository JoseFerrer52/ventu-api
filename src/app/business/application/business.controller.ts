import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { uploadImageToServer } from "../../../services/generate_image_link/upload-image-to-server";
import {
  DataInputForBusiness,
  DataInputForCreateBusiness,
} from "../domain/model/business";
import { response } from "../../../utilities/response";
import { UpadteBusiness } from "../infrastructure/update-business.mysql";
import { resgiterBusiness } from "../infrastructure/register-business.mysql";

const pool = createPool();

export const createBusiness = async (req: Request, res: Response) => {
  const data: DataInputForCreateBusiness = req.body;
  const file = req.file;

  const image = await uploadImageToServer(file);

  const resgiterBusinessFunc = await resgiterBusiness(pool);
  const signIn = await resgiterBusinessFunc(data, image);

  response(res, 200, signIn);
};

export const putBusiness = async (req: Request, res: Response) => {
  const data: DataInputForBusiness = req.body;
  const file = req.file;

  if (file === undefined) {
    const UpadteBusinessFun = await UpadteBusiness(pool);
    const business = await UpadteBusinessFun(data, null);

    response(res, 200, business);
  } else {
    const businessLogo = await uploadImageToServer(file);
    const UpadteBusinessFun = await UpadteBusiness(pool);
    const business = await UpadteBusinessFun(data, businessLogo);

    response(res, 200, business);
  }
};
