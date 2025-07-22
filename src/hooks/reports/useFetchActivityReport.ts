import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ReportParams } from "@/interface/ReportPrams.interface";
import { ActivityReport } from "@/interface/activity.interface";

const fetchActivityReport = async ({ month, year,}: ReportParams): Promise<ActivityReport> => {
  const response = await axiosInstance.get("/report/activity", {
    params: { month, year },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch Activity report data");
  }

  return response.data;
};


export const useFetchActivityReport = (month: number, year: number, enabled = true) => {
    return useQuery<ActivityReport>({
        queryKey: ['Activity-report', month, year],
        queryFn: () => fetchActivityReport({ month, year }),
        enabled: enabled && !! month && !!year,
        retry: 1,
    })
}