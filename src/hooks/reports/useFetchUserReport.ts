import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/interface/user.interface"


const fetchUserList = async(): Promise<User[]> => {
    const response = await axiosInstance.get(`/report/user`);

    if(response.status !== 200) {
        throw new Error('Failed to fetch report test-drive');
    };

    return response.data.data;
}


export const useFetchUserListReport = () => {
    return useQuery<User[]>({
        queryKey: ["user-report"],
        queryFn: () => fetchUserList(),        
        retry: 1,
    });
}

