import { BaseProspek } from "./prospek.interface";
import { SalesId } from "@/types/salesId.type";
import { SpkId } from "@/types/spkId.type";

export interface Retail extends BaseProspek {
  salesId: SalesId;
  spkId: SpkId;
  dateRetail: string;
  carType: string;
  id: string;
}

export interface RetailRequest {
  spkId: string;
  dateRetail: string;
  carType: string;
}

export interface RetailReport {
  count: number;
  period: string;
  generatedBy: string;
  data: Retail[];
}
