import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { RetailReport } from "@/interface/retail.interface";
import { ReportParams } from "@/interface/ReportPrams.interface";

const fetchRetailReport = async ({
  month,
  year,
}: ReportParams): Promise<RetailReport> => {
  const response = await axiosInstance.get(`/report/retail`, {
    params: { month, year },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch report test-drive");
  }

  return response.data;
};

export const useFetchRetailReport = (
  month: number,
  year: number,
  enabled = true,
) => {
  return useQuery<RetailReport>({
    queryKey: ["testDrive-report", month, year],
    queryFn: () => fetchRetailReport({ month, year }),
    enabled: enabled && !!month && !!year,
    retry: 1,
  });
};
