export interface Prospek {
  name: string;
}

export interface SPK {
  prospekId: Prospek;
}

export type salesId = {
    username: string
}

export interface Retail {
  salesId: salesId;
  spkId: SPK;
  carType: string;
}

export interface Feedback {
  retailId: Retail;
  rating: number;
  message: string;  
}

export interface FeedbackReportItem {
  expiredAt: string;
  used: boolean;
  retailId: Retail;
  feedbackId: Feedback;
}

export interface SummaryFeedbackReport {
  count: number;
  period: string;
  generatedBy: string;
  data: FeedbackReportItem[];
}
