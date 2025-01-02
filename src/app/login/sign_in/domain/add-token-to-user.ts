export async function addTokenToUser(
  data,
  token: string,
  registerBusiness: boolean
) {
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
        token: token,
      };
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
}
