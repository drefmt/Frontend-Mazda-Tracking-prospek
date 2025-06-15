import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

interface SalesId {
  id: string;
  username: string;
}

interface ProspekId {
  _id: string;
  name: string;
  whatsappNum: string;
}

interface SpkId {
  _id: string;
  prospekId: ProspekId;
}

interface Retail {
  salesId: SalesId;
  id: string;
  spkId: SpkId;
  dateRetail: string;
  status: string;
  carType: string;
}

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
