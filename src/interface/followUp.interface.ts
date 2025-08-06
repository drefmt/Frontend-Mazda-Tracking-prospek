import { Interaction } from "@/types/interaction.type";

export interface FollowUp {
  id?: string;
  followUpDate: string;
  salesProces: string;
  interaction: Interaction;
  note: string;
  customerResponse: string;
  recommendation: string;
}

export interface FollowUpData {
  name: string;
  salesName: string;
  totalFollowUp: number;
  lastFollowUpStatus: string;
  lastFollowUpDate: string;
}

export interface FollowUpReport {
  count: number;
  period: string;
  generatedBy: string;
  data: FollowUpData[];
}
