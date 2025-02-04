export async function recordDataToUser(data) {
  try {
    const mergedData = data.map((record) => {
      return {
        userId: record.userId,
        userBusinessId: record.userBusinessId,
        businessLogo: record.businessLogo,
      };
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
}
