import { YearlyActivityResponse } from "@/interface/yearlyActivity.interface";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchYearlyActivity = async (): Promise<YearlyActivityResponse> => {
  const response = await axiosInstance.get("/dashboard/yearly-activity");
  if (response.status !== 200) {
    throw new Error("Ffailed to fetch yearly actifity");
  }
  return response.data;
};

export const useFetchYearlyActivity = () => {
  return useQuery<YearlyActivityResponse>({
    queryKey: ["yearly-activity"],
    queryFn: fetchYearlyActivity,
    retry: 1,
  });
};
