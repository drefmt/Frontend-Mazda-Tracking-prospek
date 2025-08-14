import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RetailRequest } from "@/interface/Retail.interface";

const editRetail = async (id: string, retailData: RetailRequest) => {
  const response = await axiosInstance.put(`/retail/${id}`, retailData);
  return response.data;
};

export const useEditRetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id,retailData,}: {
      id: string;
      retailData: RetailRequest;
    }) => editRetail(id, retailData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retail"] });
    },
  });
};
