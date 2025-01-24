export interface DataForProduct {
  userId: number;
  userBusinessId: number;
  productId?: number;
  productName: string;
  productDescription: string;
  productAmount: number;
  token: string;
}

export interface Product {
  message: string;
  object: any;
  token: string;
}
