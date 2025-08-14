import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/interface/activity.interface";

const fetchActivity = async (): Promise<Activity[]> => {
  const response = await axiosInstance.get("/activity");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (response.status !== 200) {
    throw new Error("Failed to fetch activity data");
  }
  return response.data;
};

export const useFetchActifity = () => {
  return useQuery<Activity[]>({
    queryKey: ["Activity"],
    queryFn: fetchActivity,
    retry: 1,
  });
};
