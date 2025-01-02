export async function cleanDataSale(data: any) {
  const cleanData = data.map((record) => {
    return {
      incomeId: record.incomeId,
      typeIncome: record.typeIncome,
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      alias: record.alias,
      productImage: record.productImage,
      productName: record.productName,
      productDescription: record.productDescription,
      saleType: record.saleType,
      transactionId: record.transactionId,
      saleTypeId: record.saleTypeId,
      date: record.date,
      description: record.description,
      amount: record.amount,
      incomeType: record.incomeType,
    };
  });
  return cleanData;
}

export async function cleanDataOtherIncome(data: any) {
  const cleanData = data.map((record) => {
    return {
      incomeId: record.incomeId,
      typeIncome: record.typeIncome,
      transactionId: record.transactionId,
      date: record.date,
      description: record.description,
      amount: record.amount,
      additionalNote: record.additionalNote,
      incomeType: record.incomeType,
    };
  });
  return cleanData;
}

export async function cleanDataExpense(data: any) {
  const cleanData = data.map((record) => {
    return {
      expenseId: record.expenseId,
      typeExpenses: record.typeExpenses,
      date: record.date,
      description: record.description,
      amount: record.amount,
      additionalNote: record.additionalNote,
    };
  });
  return cleanData;
}
