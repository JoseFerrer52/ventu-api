export interface DataInputSaleReceivable {
  userId: number;
  userBusinessId: number;
  saleReceivableId?: number;
}

interface SaleReceivable {
  saleReceivableId: number;
  debtStatus: string;
  receivableDescription: string;
  additionaNote: string;
  debtAmount: number;
}

export interface Transaction {
  saleReceivable: SaleReceivable[];
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
  saleReceivable: Sale[];
}
