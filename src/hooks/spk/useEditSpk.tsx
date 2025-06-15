import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";



interface SpkData {
    prospekId : string;    
    cashOrCredit: string;
    dateSpk: string;
    downPayment: number;
    leasing: string;
    noKtp: string;
    tenor: string;   
    status: string;
}

const editSpk = async (id: string, spkData: SpkData) => {
  const response = await axiosInstance.put(`/spk/${id}`, spkData);
  return response.data;
}

export const useEditSpk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, spkData }: { id: string; spkData: SpkData }) => editSpk(id, spkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spk'] });
    },
    onError: (error: Error) => {
      console.error('Error editing spk:', error);
    }
  });
}