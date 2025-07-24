import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type ProspekId = {
  id: string;
  name: string;
  whatsappNum: string;
  carType: string;
  address: string;
};

export type SalesId = {
  id: string;
  username: string;  
};


export type Spk = {
  prospekId: ProspekId;
  salesId: SalesId;
  dateSpk: string;
  noKtp: string;  
  cashOrCredit: string;
  downPayment: number;
  tenor: string;
  leasing: string;
  status: string;  
  id: string;
};

const fetchSpkById = async (id: string): Promise<Spk> => {
  const response = await axiosInstance.get(`spk/${id}`);
  return response.data;
};

export const useFetchSpkById = (id: string) => {
  
  return useQuery<Spk, Error>({
    queryKey: ["spk"], 
    queryFn: () => fetchSpkById(id),
    enabled: !!id, 
    retry: 1,
  });
};
