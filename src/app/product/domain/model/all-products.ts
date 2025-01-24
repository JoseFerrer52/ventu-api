export interface DataInputForProduct {
  userId: number;
  userBusinessId: number;
  productId?: number;
  token: string;
}

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productDescription: string;
}

export interface ProductResponse {
  message: string;
  object: Product[];
  token: string;
}
