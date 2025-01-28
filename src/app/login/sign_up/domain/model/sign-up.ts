export interface DataInputForSignUp {
  firstName: string;
  lastName: string;
  userName: string;
  userPassword: string;
  userDateCreation: string;
  updateDate: string;
  userEmail: string;
}

export interface SignUpResponse {
  message: string;
  object: any;
  token: string;
}
