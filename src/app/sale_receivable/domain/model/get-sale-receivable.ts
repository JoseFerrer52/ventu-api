export interface DataInputSaleReceivable {
  userId: number;
  userBusinessId: number;
  saleReceivableId?: number;
  token: string;
}

interface SaleReceivable {
  saleReceivableId: number;
  debtStatus: string;
  receivableDescription: string;
  additionaNote: string;
  debtAmount: number;
}

export interface Transaction {
  message: string;
  object: SaleReceivable[];
  token: string;
}

interface Sale {
  transactionId: number;
  customerName: string;
  customerPhone: string;
  alias: string;
  itemQuantity: number;
  productImage: string;
  productName: string;
  productDescription: string;
  saleType: string;
  saleTypeId: number;
  status: string;
  date: string;
  description: string;
  additionalNote: string;
  amount: number;
}

export interface SaleReceivableResponse {
  message: string;
  object: Sale[];
  token: string;
}
