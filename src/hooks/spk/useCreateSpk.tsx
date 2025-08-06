import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpkRequest } from "@/interface/spk.interface"


const createSpk = async (spkData: SpkRequest) => {
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
