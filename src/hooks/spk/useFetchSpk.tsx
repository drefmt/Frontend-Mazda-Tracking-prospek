import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Spk } from "@/interface/spk.interface";

const fetchSpk = async (): Promise<Spk[]> => {
  const response = await axiosInstance.get("/spk");

  if (response.status !== 200) {
    throw new Error("Failed to fetch SPK data");
  }

  return response.data;
};

export const useFetchSpk = () => {
  return useQuery<Spk[]>({
    queryKey: ["spk"],
    queryFn: fetchSpk,
    retry: 1,
  });
};
