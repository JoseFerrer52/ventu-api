export async function cleanDataAllSaleReceivable(data: any) {
  const cleanData = data.map((record) => {
    return {
      saleReceivableId: record.saleReceivableId,
      debtStatus: record.debtStatus,
      receivableDescription: record.receivableDescription,
      additionaNote: record.additionaNote,
      debtAmount: record.debtAmount,
    };
  });
  return cleanData;
}

export async function cleanDataSaleReceivable(data: any) {
  const cleanData = data.map((record) => {
    return {
      transactionId: record.transactionId,
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      alias: record.alias,
      productImage: record.productImage,
      productName: record.productName,
      productDescription: record.productDescription,
      saleType: record.saleType,
      saleTypeId: record.saleTypeId,
      status: record.status,
      date: record.date,
      description: record.description,
      additionalNote: record.additionalNote,
      amount: record.amount,
    };
  });
  return cleanData;
}
