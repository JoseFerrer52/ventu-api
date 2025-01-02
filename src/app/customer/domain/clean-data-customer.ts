export async function cleanDataCustomer(data: any) {
  const cleanData = data.map((record) => {
    return {
      customerId: record.customerId,
      customerName: record.customerName,
      customerPhone: record.customerPhone,
      customerAlias: record.customerAlias,
    };
  });
  return cleanData;
}
