import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity } from "@/interface/activity.interface";

const editActivity = async (id: string, activityData: Activity) => {
  const response = await axiosInstance.put(`/activity/${id}`, activityData);
  return response.data;
};

export const useEditActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      activityData,
    }: {
      id: string;
      activityData: Activity;
    }) => editActivity(id, activityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Activity"] });
    },
    onError: (error: Error) => {
      console.error("Error editing activity:", error);
    },
  });
};
