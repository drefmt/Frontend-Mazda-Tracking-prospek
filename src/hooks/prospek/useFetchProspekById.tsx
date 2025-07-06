import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Prospek } from '@/interface/prospek.interface'


const fetchProspekById = async(id: string): Promise<Prospek> => {
    const response = await axiosInstance.get(`prospek/${id}`);
    // console.log(response.data);
    return {
        ...response.data,
        followUps: Array.isArray(response.data.followUps) ? response.data.followUps : [],
        salesId: response.data.salesId ?? null, 
    }
    
}

export const useFetchProspekById = (id: string) => {
    return useQuery<Prospek, Error>({
        queryKey: ['prospek', id],
        queryFn: () => fetchProspekById(id),
        enabled: !!id,
        retry: 1
    })
}

