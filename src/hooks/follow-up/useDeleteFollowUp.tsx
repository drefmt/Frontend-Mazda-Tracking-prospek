import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFolowUp = async(id: string) => {
    const response = await axiosInstance.delete(`/follow-up/${id}`);
    return response.data;
}

export const useDeleteFollowUp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFolowUp,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['follow-up']});
        },
        onError: (error: Error) => {
            console.log("Error Deleting Follow-Up", error);
        }
    })
}