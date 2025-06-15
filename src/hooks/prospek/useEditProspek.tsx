import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseProspek as ProspekData } from "@/interface/base-prospek.interface"

const editProspek = async (id: string, prospekData: ProspekData) => {
  const response = await axiosInstance.put(`/prospek/${id}`, prospekData);
  return response.data;
};

export const useEditProspek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, prospekData }: { id: string; prospekData: ProspekData }) => editProspek(id, prospekData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospek'] });
    },
    onError: (error: Error) => {
      console.error('Error editing prospek:', error);
    },
  });
};
