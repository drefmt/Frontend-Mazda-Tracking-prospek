import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Prospek } from "@/interface/prospek.interface"



const fetchAvailableForSpk = async(): Promise<Prospek[]> => {
    const response = await axiosInstance.get('/prospek/available-for-spk');
    console.log(response.data);
    if(response.status !== 200){
        throw new Error('Failed to fetch prospek Data');
    }

    return response.data;
}


export const useFetchAvailableForSpk = () => {
    return useQuery<Prospek[]>({
        queryKey: ["available-for-spk"],
        queryFn: fetchAvailableForSpk,
        retry: 1,
    });
}