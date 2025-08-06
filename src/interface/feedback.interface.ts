type Prospek = {
  name: string;
};

type SPK = {
  prospekId: Prospek;
};

type salesId = {
  username: string;
};

type Retail = {
  salesId?: salesId;
  spkId: SPK;
  carType: string;
};

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


export interface FeedbackLink {
  id: string;
  token: string;
  used: boolean;
  expiredAt: string;
  createdAt: string;
  retailId: Retail;
  feedbackId?: {
    rating: number;
    message: string;
    customerName: string;
  };
}
export interface SummaryFeedbackReport {
  count: number;
  period: string;
  generatedBy: string;
  data: FeedbackReportItem[];
}
