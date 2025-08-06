import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Spk } from "@/interface/spk.interface"

const fetchSpkById = async (id: string): Promise<Spk> => {
  const response = await axiosInstance.get(`spk/${id}`);
  return response.data;
};

export const useFetchSpkById = (id?: string) => {
  return useQuery<Spk, Error>({
    queryKey: ["spk"], 
    queryFn: () => fetchSpkById(id!),
    enabled: !!id, 
    retry: 1,
  });
};
