export interface UpdateDataForCustomer {
  userId: number;
  userBusinessId: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAlias: string;
}

export interface Message {
  message: string;
}
