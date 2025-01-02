interface Transaction {
  typeTransactionId: number;
  transactionCategory: string;
}

export interface TypeTransaction {
  transaction: Transaction[];
}
