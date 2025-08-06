export type ProspekId = {
  id: string;
  name: string;
};

export type SalesId = {
  id: string;
  username: string;
};

export interface TestDrive {
  prospekId: ProspekId;
  salesId: SalesId;
  dateTestDrive: string;
  carType: string;
  id: string;
}

export interface TestDriveDataRequest {
    prospekId: string;
    salesId: string;
    dateTestDrive: string;
    carType: string;    
}

export interface TestDriveReport {
  count: number;
  period: string;
  generatedBy: string;
  data: TestDrive[];
}
