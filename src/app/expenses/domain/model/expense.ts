export interface DataInputForExpense {
  userId: number;
  userBusinessId: number;
  typeTransactionId: number;
  expensesDescription: string;
  expensesDate: string;
  expensesAmount: number;
  expensesAdditionalNote: string;
}
