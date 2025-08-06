// ==== PROSPEK DAN SALES ====
export type ProspekId = {
  id: string;
  name: string;
  whatsappNum: string;
  address: string;
  carType: string;
};

export type SalesId = {
  username: string;
};

// ==== FULL RESPONSE DARI API ====
export interface Spk {
  prospekId: ProspekId;
  salesId: SalesId;
  dateSpk: string;
  noKtp: string;
  cashOrCredit: string;
  downPayment: number;
  tenor: string;
  leasing: string;
  status: string;
  id: string;
}

// ==== REQUEST BODY UNTUK CREATE/EDIT ====
export interface SpkRequest {
  prospekId: string; // hanya id saja
  dateSpk: string;
  noKtp: string;
  cashOrCredit: string;
  downPayment: number;
  tenor: string;
  leasing: string;
  status: string;
}

// ==== REPORT ====
export interface SpkReport {
  count: number;
  period: string;
  generatedBy: string;
  data: Spk[];
}
