export type ProspekId = {
  id: string;
  name: string;
}

export type SalesId = {
  id: string;
  username: string
}

export type TestDrive = {
  prospekId: ProspekId;
  salesId: SalesId;  
  dateTestDrive: string;
  carType: string;
  id: string;
}