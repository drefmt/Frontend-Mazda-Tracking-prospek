import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {  ReportSummaryEvaluation } from "@/interface/evaluation.interface"

interface ReportParams {
    year: number;
}

const fetchSalesEvaluation = async({ year }: ReportParams): Promise<ReportSummaryEvaluation> => {
    const response = await axiosInstance.get(`/report/evaluation`, {
        params: { year },
    });

    if(response.status !== 200) {
        throw new Error('Failed to fetch report test-drive');
    };
     console.log("Fetching evaluation for year:", year);
     console.log(response.data);
    return response.data;
}


export const useFetchSalesEvaluation = (year: number) => {
  return useQuery<ReportSummaryEvaluation>({
    queryKey: ["fetchSalesPerformance-report", year], 
    queryFn: () => fetchSalesEvaluation({ year }),
    enabled: false,
    retry: 1,
  });
};

