

// export interface Activity {
//     date: string;
//     activityType: string;
//     description: string;
//     isDone: boolean;
//     location: string;
//     notes: string;    
//     id: string;
// }


import { SalesId } from "@/types/salesId.type";

export interface Activity {
  salesId?: SalesId;
  date: string;
  activityType: string;
  description: string;
  isDone: boolean;
  location: string;
  notes: string;
  id?: string;
}

export interface ActivityReport {
  count: number;
  period: string;
  generatedBy: string;
  data: Activity[];
}
