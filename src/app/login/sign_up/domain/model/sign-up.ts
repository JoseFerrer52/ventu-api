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
  token: string;
  responseEmail: string;
  userId: number;
}
