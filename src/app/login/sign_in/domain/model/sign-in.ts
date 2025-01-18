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
  message: string;
  object: SignIn[];
  token: string;
}

interface SignInForBusiness {
  userId: number;
  registerBusiness: boolean;
}

export interface SignInForRegisterBusiness {
  message: string;
  object: SignInForBusiness[];
  token: string;
}
