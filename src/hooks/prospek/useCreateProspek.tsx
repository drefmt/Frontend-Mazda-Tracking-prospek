import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseProspek as ProspekData } from "@/interface/base-prospek.interface"

const createProspek = async (prospekData: ProspekData) => {
  const response = await axiosInstance.post('/prospek', prospekData);
  
  if (response.status !== 201) {
    throw new Error("Failed to create SPK");
  }

  return response.data;
};

export const useCreateProspek = () =>  {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProspek,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospek'] });
    },
    onError: (error: Error) => {
      console.error('Error creating prospek:', error);
    },
  });
};
