export interface DataImputForConfirmEmail {
  userId: number;
  code: string;
  token: string;
}

export interface confirmEmail {
  message: string;
  object: any;
  token: string;
}

export interface DataImputForRefreshEmail {
  userId: number;
  userEmail: string;
  token: string;
}
