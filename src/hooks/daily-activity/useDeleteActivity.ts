 import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const deleteActivity = async(id: string) => {
    const response = await axiosInstance.delete(`/activity/${id}`);
    return response.data;
} 


export const useDeleteActivity = () => {
    const queryClient =  useQueryClient();

    return useMutation({
        mutationFn: deleteActivity,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ['Acctifity']})},
        onError: (error: Error) => {
            console.error("Error Deleting activity", error);
        }
    })
}