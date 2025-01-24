export interface Rubros {
  businessRubrosId: number;
  businessSectorCategory: string;
}

export interface TypeRubros {
  message: string;
  object: Rubros[];
  token: string;
}
