import { axiosInstance } from "@/lib/axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FollowUp } from "@/interface/followUp.interface";

  type NewFollowUp = Omit<FollowUp, '_id'>;

const createFollowUp = async (id: string, followUp: NewFollowUp) => {
  const response = await axiosInstance.post(`/prospek/${id}/follow-up`, followUp);
  return response.data;
};

export const useCreateFollowUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; followUp: NewFollowUp }) => createFollowUp(data.id, data.followUp),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['prospek', id, 'follow-up'] });
    },
    
  });
};
