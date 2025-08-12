export interface YearlyActivitySummary {
  prospek: number;
  testDrive: number;
  spk: number;
  retail: number;
}

export interface YearlyActivityDataPoint extends YearlyActivitySummary {
  date: string;
}

export interface YearlyActivityResponse {
  summary: YearlyActivitySummary;
  chartData: YearlyActivityDataPoint[];
}
