async function cleanDataIncome(data: any) {
  const mergedData = data
    .filter(
      (record) =>
        record.date !== null ||
        record.description !== null ||
        record.amount !== null
    ) // Filtra registros con todos los campos nulos
    .map((record) => {
      return {
        typetransactionId: record.typeTransactionId,
        typeTransaction: record.typeTransaction,
        typeIncomeId: record.typeIncomeId,
        typeIncome: record.typeIncome,
        incomeId: record.incomeId,
        transactionId: record.transactionId,
        date: record.date,
        description: record.description,
        amount: record.amount,
        incomeType: record.incomeType,
      };
    });
  return mergedData;
}

async function cleanDataExpense(data: any) {
  const mergedData = data.map((record) => {
    return {
      expensesId: record.expensesId,
      typeTransactionId: record.typeTransactionId,
      typeTransaction: record.typeTransaction,
      typeExpenses: record.typeExpenses,
      date: record.date,
      description: record.description,
      amount: record.amount,
    };
  });
  return mergedData;
}

export { cleanDataIncome, cleanDataExpense };
