import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export type SpkData = {
  prospekId: string;  
  dateSpk: string;
  noKtp: string;  
  cashOrCredit: string;
  downPayment: number;
  tenor: string;
  leasing: string;
  status: string;  
};

const createSpk = async (spkData: SpkData) => {
  const response = await axiosInstance.post('/spk', spkData);

  if (response.status !== 201) {
    throw new Error("Failed to create SPK");
  }

  return response.data;
};

export const useCreateSpk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSpk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spk"] });
    },
  });
};
