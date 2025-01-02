interface Transacción {
  incomeId: number;
  typeIncome: string;
  transactionId: number;
  date: string;
  description: string;
  amount: number;
  additionalNote: string;
  incomeType: string;
}

export interface OtherIncome {
  otherIncome: Transacción[];
}
