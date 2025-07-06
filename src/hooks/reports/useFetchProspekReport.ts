// hooks/prospek/useFetchProspekReport.ts

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Prospek } from "@/interface/prospek.interface";

interface ReportParams {
  month: number;
  year: number;
}

const fetchProspekReport = async ({ month, year }: ReportParams): Promise<Prospek[]> => {
  const response = await axiosInstance.get(`/report/prospek`, {
    params: { month, year },
  });

  if (response.status !== 200) {
    throw new Error("Gagal mengambil data laporan prospek");
  }

  return response.data.data;
};

export const useFetchProspekReport = (month: number, year: number, enabled = true) => {
  return useQuery<Prospek[]>({
    queryKey: ["prospek-report", month, year],
    queryFn: () => fetchProspekReport({ month, year }),
    enabled: enabled && !!month && !!year,
    retry: 1,
  });
};
