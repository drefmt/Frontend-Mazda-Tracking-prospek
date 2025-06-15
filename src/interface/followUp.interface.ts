import { Interaction } from "@/types/interaction.type";

export interface FollowUp {
  _id: string;
  followUpDate: string;
  salesProces: string;
  interaction: Interaction;
  note: string;
  customerResponse: string;
  recommendation: string;
}
