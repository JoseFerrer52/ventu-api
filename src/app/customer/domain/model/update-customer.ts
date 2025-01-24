export interface UpdateDataForCustomer {
  userId: number;
  userBusinessId: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAlias: string;
  token: string;
}

export interface Customer {
  message: string;
  object: any;
  token: string;
}
