import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteRetail = async (id: string) => {
  const response = await axiosInstance.delete(`/retail/${id}`);
  return response.data;
};

export const useDeleteRetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retail"] });
    },
    onError: (error: Error) => {
      console.error("Error Deleting retail", error);
    },
  });
};
