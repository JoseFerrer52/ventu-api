export interface DataImputForSearchSale {
  userId: number;
  userBusinessId: number;
  transactionId: number;
  typetransactionId: number;
  typeIncomeId?: number;
  token: string;
}

interface Sale {
  incomeId: number;
  typeIncome: string;
  customerName: string;
  customerPhone: string;
  alias: string;
  itemQuantity: number;
  productImage: string;
  productName: string;
  productDescription: string;
  saleType: string;
  transactionId: number;
  saleTypeId: number;
  date: string;
  description: string;
  amount: number;
  incomeType: string;
}

export interface SaleTransaction {
  message: string;
  object: Sale[];
  token: string;
}
