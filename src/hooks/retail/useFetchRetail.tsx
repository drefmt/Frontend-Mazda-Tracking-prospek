import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Retail } from "@/interface/Retail.interface";

const fetchRetail = async (): Promise<Retail[]> => {
  const response = await axiosInstance.get("/retail");
  return response.data;
};

export const useFetchRetail = () => {
  return useQuery<Retail[]>({
    queryKey: ["retail"],
    queryFn: fetchRetail,
    retry: 1,
  });
};
