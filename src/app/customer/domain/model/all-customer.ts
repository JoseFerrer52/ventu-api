export interface DataImputForCustomer {
  userId: number;
  userBusinessId: number;
  customerId?: number;
  token: string;
}

interface Customer {
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAlias: string;
}

export interface CustomerResponse {
  message: string;
  object: Customer[];
  token: string;
}
