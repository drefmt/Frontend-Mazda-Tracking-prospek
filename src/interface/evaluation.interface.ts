export interface Evaluation {
   month: string;
   totalProspects: number;
   totalTestDrives: number;
   totalSpks: number;
   totalRetails: number;
   testDriveConversion: string;
   spkConversion: string;
   retailConversion: string;
}

export interface ReportSummaryEvaluation {
   count: number;
   period: string;
   generatedBy: string;
   data: Evaluation[];
}
