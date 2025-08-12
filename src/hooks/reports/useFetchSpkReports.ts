import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { SpkReport } from "@/interface/spk.interface";
import { ReportParams } from "@/interface/ReportPrams.interface";

const fetchSpkReport = async ({
  month,
  year,
}: ReportParams): Promise<SpkReport> => {
  const response = await axiosInstance.get(`/report/spk`, {
    params: { month, year },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch spk report data");
  }
  console.log(response.data);
  return response.data;
};

export const useFetchSpkReport = (
  month: number,
  year: number,
  enabled = true,
) => {
  return useQuery<SpkReport>({
    queryKey: ["spk-report", month, year],
    queryFn: () => fetchSpkReport({ month, year }),
    enabled: enabled && !!month && !!year,
    retry: 1,
  });
};
