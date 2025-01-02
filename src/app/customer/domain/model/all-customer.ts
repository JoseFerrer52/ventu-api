export interface DataImputForCustomer {
  userId: number;
  userBusinessId: number;
  customerId?: number;
}

interface Customer {
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerAlias: string;
}

export interface CustomerResponse {
  customer: Customer[];
}
