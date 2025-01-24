export interface DataInputForUser {
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  userPassword: string;
  updateDate: string;
  userEmail: string;
  token: string;
}

export interface User {
  message: string;
  object: any;
  token: string;
}
