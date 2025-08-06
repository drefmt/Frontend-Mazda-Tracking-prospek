import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpkRequest } from "@/interface/spk.interface"

const editSpk = async (id: string, spkData: SpkRequest) => {
  const response = await axiosInstance.put(`/spk/${id}`, spkData);
  return response.data;
}

export const useEditSpk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, spkData }: { id: string; spkData: SpkRequest }) => editSpk(id, spkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spk'] });
    },
    onError: (error: Error) => {
      console.error('Error editing spk:', error);
    }
  });
}