import { response } from "../../../utilities/response";
import { Response, Request } from "express";
import { createPool } from "../../../data/mysql";
import { uploadImageToServer } from "../../../services/generate_image_link/upload-image-to-server";
import { DataInputForProduct } from "../domain/model/all-products";
import { DataForProduct } from "../domain/model/product";
import { selectAllProducts } from "../infrastructure/select-all-product.mysql";
import { selectProduct } from "../infrastructure/select-product.mysql";
import { registerproduct } from "../infrastructure/register-product.mysql";
import { updateProduct } from "../infrastructure/update-product.msql";
import { productDelete } from "../infrastructure/delete-product.mysql";

const pool = createPool();

export const getAllProducts = async (req: Request, res: Response) => {
  const data: DataInputForProduct = req.body;

  const selectAllProductsFunc = await selectAllProducts(pool);
  const product = await selectAllProductsFunc(data);

  response(res, 200, product);
};

export const getProduct = async (req: Request, res: Response) => {
  const data: DataInputForProduct = req.body;

  const selectProductFunc = await selectProduct(pool);
  const product = await selectProductFunc(data);

  response(res, 200, product);
};

export const postProducts = async (req: Request, res: Response) => {
  const data: DataForProduct = req.body;
  const file = req.file;

  const productImage: string = await uploadImageToServer(file);

  const registerproductFunc = await registerproduct(pool);
  const product = await registerproductFunc(data, productImage);

  response(res, 200, product);
};

export const putProduct = async (req: Request, res: Response) => {
  const data: Partial<DataForProduct> = req.body;
  const file = req.file;

  if (file === undefined) {
    const updateProductFunc = await updateProduct(pool);
    const product = await updateProductFunc(data, null);

    response(res, 200, product);
  } else {
    const productImage: string = await uploadImageToServer(file);
    const updateProductFunc = await updateProduct(pool);
    const product = await updateProductFunc(data, productImage);

    response(res, 200, product);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const data: DataInputForProduct = req.body;

  const productDeleteFunc = await productDelete(pool);
  const product = await productDeleteFunc(data);

  response(res, 200, product);
};
