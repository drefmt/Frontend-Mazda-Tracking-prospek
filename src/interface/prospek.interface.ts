import { FollowUp } from "./followUp.interface"
import { SalesId } from "@/types/salesId.type"
import { BaseProspek } from "./base-prospek.interface"

export interface Prospek extends BaseProspek  {
    id: string;
    salesId: SalesId;
    category: string;
    followUps: FollowUp[];
    followUpCount: number;
    createdAt: string;
    updatedAt: string;
};

export interface ProspekReport {
  count: number;
  period: string;
  generatedBy: string
  data: Prospek[];
}