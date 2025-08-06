import { FollowUp } from "./followUp.interface";
import { SalesId } from "@/types/salesId.type";
import {
  Demografi,
  Psikografis,
  Perilaku,
  Lingkungan,
} from "@/types/predictScore.type";

export interface BaseProspek {
    name: string;
    date: string;
    whatsappNum: string;
    address: string;
    source: string;
    carType: string;
    status: string;
  }

export interface Prospek extends BaseProspek {
  id: string;
  salesId: SalesId;  
  followUps: FollowUp[];
  followUpCount: number;
  createdAt: string;
  updatedAt: string;  
  demografi: Demografi;
  psikografis: Psikografis;
  perilaku: Perilaku;
  lingkungan: Lingkungan;
  score:number;
  scoreCategory: 'Low' | 'Medium' | 'Hot';
}



export interface ProspekFormValue {
  name: string;
  date: string;
  whatsappNum: string;
  address: string;
  source: string;
  status: string;
  carType: string;
  
  demografi: {
    usia: number;
    pekerjaan: string;
    penghasilan: number;
  };
  psikografis: {
    minat: string[]; 
    gayaHidup: string;
    motivasi: string;
  };
  perilaku: {
    frekuensiKontak: number;
    responAwal: string;
    interaksiFavorit: string;
  };
  lingkungan: {
    sumber: string;
  };
}


export interface ProspekReport {
  count: number;
  period: string;
  generatedBy: string;
  data: Prospek[];
}
