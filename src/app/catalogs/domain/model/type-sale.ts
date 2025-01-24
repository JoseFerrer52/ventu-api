interface Sale {
  saleTypeId: number;
  saleCategory: string;
}

export interface TypeSale {
  message: string;
  object: Sale[];
  token: string;
}
