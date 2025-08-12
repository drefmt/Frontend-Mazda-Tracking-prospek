import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProspekFormValue } from "@/interface/prospek.interface";

const createProspek = async (prospekData: ProspekFormValue) => {
  const response = await axiosInstance.post("/prospek", prospekData);

  if (response.status !== 201) {
    throw new Error("Failed to create Prospect");
  }

  return response.data;
};

export const useCreateProspek = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProspek,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospek"] });
    },
    onError: (error: Error) => {
      console.error("Error creating prospek:", error);
    },
  });
};
