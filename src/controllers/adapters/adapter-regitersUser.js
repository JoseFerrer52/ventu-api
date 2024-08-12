async function mergeUserData(data) {
    console.log(data);
    try {
        const mergedData = data.map((record) => {
            return {
                userId: record.userId,
                firstName: record.firstName,
                lastName: record.lastName,
                userBusinessId: record.userBusinessId,
                businessName: record.businessName,
                businessLogo: record.businessLogo,
                token: record.token
            };
          });
        return mergedData;
    } catch (error) {
        console.log(error);
    }
    
  }
  
  export { mergeUserData };