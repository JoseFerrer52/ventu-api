// Interface para la entrada de datos
export interface TransactionInput {
  userId: number;
  userBusinessId: number;
  token: string;
}

// Interface para la salida de datos o representación de los datos de transacciones
interface Income {
  typetransactionId: number;
  typeTransaction: string;
  typeIncomeId: number;
  typeIncome: string;
  incomeId: number;
  transactionId: number;
  date: string;
  description: string;
  amount: number;
  incomeType: string;
}
interface Expense {
  expensesId: number;
  typeTransactionId: number;
  typeTransaction: string;
  typeExpenses: string;
  date: string;
  description: string;
  amount: number;
}

interface Transaction {
  income: Income[];
  expense: Expense[];
}

export interface AllTransaction {
  message: string;
  object: Transaction;
  token: string;
}
