import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProspek = async (id: string) => {
  const response = await axiosInstance.delete(`/prospek/${id}`);
  return response.data;
};

export const useDeleteProspek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProspek,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospek"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting prospek:", error);
    },
  });
};
