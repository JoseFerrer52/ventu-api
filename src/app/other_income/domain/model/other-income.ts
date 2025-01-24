export interface DataInputOtheIncome {
  userId: number;
  userBusinessId: number;
  typeTransactionId: number;
  typeIncomeId: number;
  description: string;
  date: string;
  amount: number;
  additionalNote: string;
  token: string;
}

export interface OtherIncome {
  message: string;
  object: any;
  token: string;
}
