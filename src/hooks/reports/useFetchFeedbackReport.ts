import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ReportParams } from "@/interface/ReportPrams.interface";
import { SummaryFeedbackReport } from "@/interface/feedback.interface";

const fetchActivityReport = async ({ month, year,}: ReportParams): Promise<SummaryFeedbackReport> => {
  const response = await axiosInstance.get("/report/feedback", {
    params: { month, year },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch Feedback report data");
  }
  console.log(response.data);
  return response.data;
};


export const useFetchFeecbackReport = (month: number, year: number, enabled = true) => {
    return useQuery<SummaryFeedbackReport>({
        queryKey: ['Feedback-report', month, year],
        queryFn: () => fetchActivityReport({ month, year }),
        enabled: enabled && !! month && !!year,
        retry: 1,
    })
}