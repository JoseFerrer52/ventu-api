export interface DataInputForExpense {
  userId: number;
  userBusinessId: number;
  typeTransactionId: number;
  expensesDescription: string;
  expensesDate: string;
  expensesAmount: number;
  expensesAdditionalNote: string;
  token: string;
}

export interface OtherIncome {
  message: string;
  object: any;
  token: string;
}
