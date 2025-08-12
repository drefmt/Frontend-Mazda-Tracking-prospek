import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowUp } from "@/interface/followUp.interface";

type NewFollowUp = Omit<FollowUp, "_id">;

type UpdateFollowUpInput = {
  prospekId: string;
  followUpId: string;
  followUp: NewFollowUp;
};

const editFollowUp = async (
  prospekId: string,
  followUpId: string,
  followUp: NewFollowUp,
) => {
  const response = await axiosInstance.put(
    `/prospek/${prospekId}/follow-up/${followUpId}`,
    followUp,
  );
  return response.data;
};

export const useEditFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ prospekId, followUpId, followUp }: UpdateFollowUpInput) =>
      editFollowUp(prospekId, followUpId, followUp),

    onSuccess: (_, { prospekId, followUpId }) => {
      queryClient.invalidateQueries({
        queryKey: ["followUp", prospekId, followUpId],
      });
    },

    onError: (error: Error) => {
      console.error("❌ Error editing follow-up:", error.message);
    },
  });
};
