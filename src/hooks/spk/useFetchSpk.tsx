
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type ProspekId = {
  _id: string;  
  name: string;
  whatsappNum: string;
  carType: string;
  address: string;

}

export type SalesId = {
  id: string;
  username: string;
}

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
}



const fetchSpk = async (): Promise<Spk[]> => {

  const response = await axiosInstance.get('/spk');

  if (response.status !== 200) {
    throw new Error("Failed to fetch SPK data");
  }

  return  response.data;
}

export const useFetchSpk = () => {
  return useQuery<Spk[]>({
    queryKey: ["spk"],
    queryFn: fetchSpk,
    retry: 1,    
    
  });
}