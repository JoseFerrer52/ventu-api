export async function addTokenToBusiness(data, token: string) {
  try {
    const mergedData = data.map((record) => {
      return {
        userId: record.userId,
        firstName: record.firstName,
        lastName: record.lastName,
        userEmail: record.userEmail,
        userBusinessId: record.userBusinessId,
        businessName: record.businessName,
        businessLogo: record.businessLogo,
        token: token,
      };
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
}
