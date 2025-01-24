export interface DataInputDirectSale {
  userId: number;
  userBusinessId: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAlias: string;
  productId: number;
  typeTransactionId: number;
  typeIncomeId: number;
  saleTypeId: number;
  saleDate: string;
  saleDescription: string;
  saleAmount: number;
  intemQuantity: Number;
  token: string;
}

export interface DirectSale {
  message: string;
  object: any;
  token: string;
}
