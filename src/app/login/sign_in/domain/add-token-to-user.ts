export async function addTokenToUser(data, registerBusiness: boolean) {
  try {
    const mergedData = data.map((record) => {
      return {
        userId: record.userId,
        firstName: record.firstName,
        lastName: record.lastName,
        userEmail: record.userEmail,
        confirmEmail: record.confirmEmail,
        userBusinessId: record.userBusinessId,
        businessName: record.businessName,
        businessLogo: record.businessLogo,
        registerBusiness: registerBusiness,
      };
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
}
