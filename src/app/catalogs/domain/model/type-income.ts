interface Income {
  typeIncomeId: number;
  incomeCategory: string;
}

export interface TypeIncome {
  message: string;
  object: Income[];
  token: string;
}
