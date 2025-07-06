import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { BaseRetail as RetailData } from "@/interface/base-retail.iterface";
  interface RetailData {        
    spkId: string;
    dateRetail: string;    
    carType: string;
  }

const editRetail = async(id: string, retailData: RetailData) => {
    const response = await axiosInstance.put(`/retail/${id}`, retailData);
    return response.data;
}

export const useEditRetail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, retailData}: {id: string; retailData: RetailData}) => editRetail(id, retailData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["retail"]});
        }
    })
}