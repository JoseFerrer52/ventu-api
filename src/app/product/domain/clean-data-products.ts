export async function cleanDataProduct(data: any) {
  const cleanData = data.map((record) => {
    return {
      productId: record.productId,
      productImage: record.productImage,
      productName: record.productName,
      productDescription: record.productDescription,
    };
  });
  return cleanData;
}
