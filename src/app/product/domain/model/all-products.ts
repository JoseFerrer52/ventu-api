export interface DataInputForProduct {
  userId: number;
  userBusinessId: number;
  productId?: number;
}

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  productDescription: string;
}

export interface ProductResponse {
  product: Product[];
}
