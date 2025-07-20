import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "@/interface/activity.interface"

const createActivity = async(activityData: Activity) => {
    const response = await axiosInstance.post('/activity', activityData);

    if (response.status !== 201) {
    throw new Error("Failed to create activity");
  }

  return response.data;
}

export const useCreateActivity = () =>  {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Activity'] });
    },
    onError: (error: Error) => {
      console.error('Error creating paactivity:', error);
    },
  });
};