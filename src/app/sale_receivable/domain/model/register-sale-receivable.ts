import { DataInputSaleReceivable } from "./get-sale-receivable";

export interface RegisterSaleReceivable extends DataInputSaleReceivable {
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
  intemQuantity: number;
  receivableDescription: string;
  additionalNote: string;
  debtAmount: number;
}

export interface SaleReceivable {
  message: string;
  object: any;
  token: string;
}

export interface paymentReceivable {
  message: string;
  object: any;
  token: string;
}
