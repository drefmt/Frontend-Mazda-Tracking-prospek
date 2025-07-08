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

export interface SummarySalesPerformance extends SalesPerformance {
    data: SalesPerformance[];
    count: number;
    month: string;
    year: number;
}