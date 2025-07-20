 import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const deleteFeedbackLink = async(id: string) => {
    const response = await axiosInstance.delete(`/feedback/${id}`);
    return response.data;
} 


export const useDeleteFeedbackLink = () => {
    const queryClient =  useQueryClient();

    return useMutation({
        mutationFn: deleteFeedbackLink,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ['Feedback-links']})},
        onError: (error: Error) => {
            console.error("Error Deleting Feedback", error);
        }
    })
}