import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ReportParams } from "@/interface/ReportPrams.interface";
import { SummarySalesPerformance } from "@/interface/salesPerformance.interface";

const fetchSalesPerformance = async ({
  month,
  year,
}: ReportParams): Promise<SummarySalesPerformance> => {
  const response = await axiosInstance.get(`/report/sales-performance`, {
    params: { month, year },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch report test-drive");
  }

  console.log(response.data);
  return response.data;
};

export const useFetchSalesPerformance = (month: number, year: number) => {
  return useQuery<SummarySalesPerformance>({
    queryKey: ["fetchSalesPerformance-report", month, year],
    queryFn: () => fetchSalesPerformance({ month, year }),
    enabled: false,
    retry: 1,
  });
};
