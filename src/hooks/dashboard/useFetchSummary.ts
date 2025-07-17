import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Summary } from "@/interface/summary.interface";



const fetchSummary = async(): Promise<Summary> => {
    const response = await axiosInstance.get('/dashboard/summary');
    if(response.status !== 200) {
        throw new Error('Failed to fetch Summary');
    }
    return response.data
}


export const useFetchSummary = () => {
    return useQuery<Summary>({
        queryKey: ["summary"],
        queryFn: fetchSummary,
        retry: 1,
    });
}