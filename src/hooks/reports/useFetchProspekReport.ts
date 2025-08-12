// hooks/prospek/useFetchProspekReport.ts

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ProspekReport } from "@/interface/prospek.interface";
import { ReportParams } from "@/interface/ReportPrams.interface";

const fetchProspekReport = async ({
  month,
  year,
}: ReportParams): Promise<ProspekReport> => {
  const response = await axiosInstance.get(`/report/prospek`, {
    params: { month, year },
  });

  if (response.status !== 200) {
    throw new Error("Gagal mengambil data laporan prospek");
  }

  return response.data;
};

export const useFetchProspekReport = (
  month: number,
  year: number,
  enabled = true,
) => {
  return useQuery<ProspekReport>({
    queryKey: ["prospek-report", month, year],
    queryFn: () => fetchProspekReport({ month, year }),
    enabled: enabled && !!month && !!year,
    retry: 1,
  });
};
