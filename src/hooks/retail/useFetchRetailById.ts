import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Retail } from "@/interface/Retail.interface";

const fetchRetailById = async (id: string): Promise<Retail> => {
  const response = await axiosInstance.get(`retail/${id}`);
  return response.data;
};

export const useFetchRetailById = (id?: string) => {
  return useQuery<Retail, Error>({
    queryKey: ["Retail"],
    queryFn: () => fetchRetailById(id!),
    enabled: !!id,
    retry: 1,
  });
};
