import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteSpk = async (id: string) => {
  const response = await axiosInstance.delete(`/spk/${id}`);
  return response.data;
};

export const useDeleteSpk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSpk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spk"] });
    },
    onError: (error: Error) => {
      console.error("Error Deleting Prospek", error);
    },
  });
};
