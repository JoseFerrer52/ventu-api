interface Transaction {
  typeTransactionId: number;
  transactionCategory: string;
}

export interface TypeTransaction {
  message: string;
  object: Transaction[];
  token: string;
}
