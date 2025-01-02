export interface DataInputSignIn {
  userName: string;
  userPassword: string;
}

interface SignIn {
  userId: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  userBusinessId: number;
  businessName: string;
  businessLogo: string;
}

export interface SignInResponse {
  dataUser: SignIn[];
}

interface SignInForBusiness {
  userId: number;
  token: string;
}

export interface SignInForRegisterBusiness {
  dataUser: SignInForBusiness[];
}
