export type ProspekId = {
  // id: string;
  name: string;
  whatsappNum: string;
  address: string;
  carType: string;
};

export type SalesId = {
  // id: string;
  username: string;
};

export interface Spk  {  
  prospekId: ProspekId;
  salesId: SalesId;
  dateSpk: string;
  noKtp: string;  
  cashOrCredit: string;
  downPayment: number;
  tenor: string;
  leasing: string;
  status:string;
  id: string;
};