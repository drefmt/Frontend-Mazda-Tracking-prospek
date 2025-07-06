import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


  interface RetailData {  
    spkId: string;
    dateRetail: string;    
    carType: string;
  }
const createRetail = async(retailData: RetailData) => {
    const response = await axiosInstance.post('/retail', retailData);
    return response.data;
}


export const useCreateRetail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRetail,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["retail"]});
        },
        onError: (error) => {
          console.error("Error creating retail:", error); 
        },
    });
};