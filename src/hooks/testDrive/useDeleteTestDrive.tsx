import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const deleteTestDrive = async (id: string) => {
    const response = await axiosInstance.delete(`/test-drive/${id}`);
    return response.data
}

export const useDeleteTestDrive = () => {
    const queryClient = useQueryClient();


  return useMutation({
    mutationFn: deleteTestDrive,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["test-drive"]});      
    },
    onError: (error: Error) => {
      console.error("Error deleting test drive:", error);
    },
  });
};
