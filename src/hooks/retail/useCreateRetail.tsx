import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RetailRequest } from "@/interface/Retail.interface";

const createRetail = async (retailData: RetailRequest) => {
  const response = await axiosInstance.post("/retail", retailData);
  return response.data;
};

export const useCreateRetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retail"] });
    },
    onError: (error) => {
      console.error("Error creating retail:", error);
    },
  });
};
