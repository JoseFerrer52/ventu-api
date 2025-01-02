export async function addTokenToRegister(data, token: string) {
  try {
    const mergedData = data.map((record) => {
      return {
        userId: record.user_id,
        token: token,
      };
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
}
