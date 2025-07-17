export interface SalesPerformance {
    salesName: string;
    totalProspek: string;
    totalTestDrive: string;
    totalSpk: string;
    totalRetail:string;
    konversiTestDrive:string;
    konversiSpk:string;
    konversiRetail:string;
}

export interface SummarySalesPerformance {
    count: number;
    period: string;
    generatedBy: string;
    data: SalesPerformance[];
}