export interface DataInputForUpdateBusiness {
  userId: number;
  userBusinessId: number;
  sectorId: number;
  businessName: string;
  businessUpdateDate: string;
  description: string;
  token: string;
}

export interface DataInputForCreateBusiness {
  userId: number;
  sectorId: number;
  businessName: string;
  businessDateCreation: string;
  businessUpdateDate: string;
  businessDescription: string;
  token: string;
}

interface Business {
  userId: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  userBusinessId: number;
  businessName: string;
  businessLogo: string;
}

export interface BussinessResponse {
  message: string;
  object: Business[];
  token: string;
}
