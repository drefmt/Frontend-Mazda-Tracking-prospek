import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Prospek } from '@/interface/prospek.interface'


const fetchProspek = async (): Promise<Prospek[]> => {
  const response = await axiosInstance.get("/prospek");
  

  if (response.status !== 200) {
    throw new Error("Failed to fetch Prospek data");
  }
  return response.data;
};

export const useFetchProspek = () => {
  return useQuery<Prospek[]>({
    queryKey: ["prospek"],
    queryFn: fetchProspek,
    retry: 1,
  });
};
