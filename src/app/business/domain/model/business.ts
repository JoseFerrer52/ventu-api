export interface DataInputForBusiness {
  userId: number;
  userBusinessId: number;
  sectorId: number;
  businessName: string;
  businessUpdateDate: string;
  description: string;
}

export interface DataInputForCreateBusiness {
  userId: number;
  sectorId: number;
  businessName: string;
  businessDateCreation: string;
  businessUpdateDate: string;
  businessDescription: string;
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
  dataUser: Business[];
}
