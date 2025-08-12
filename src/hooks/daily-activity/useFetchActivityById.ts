import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/interface/activity.interface";
import { axiosInstance } from "@/lib/axios";

const FetchActivityById = async (id: string): Promise<Activity[]> => {
  const response = await axiosInstance.get(`/activity/${id}`);
  return {
    ...response.data,
    salesId: response.data.salesId ?? null,
  };
};

export const useFetchActivityById = (id: string) => {
  return useQuery<Activity[]>({
    queryKey: ["Activity", id],
    queryFn: () => FetchActivityById(id),
    enabled: !!id,
    retry: 1,
  });
};
