import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { UserListResponse } from "@/interface/user.interface"


const fetchUserList = async(): Promise<UserListResponse> => {
    const response = await axiosInstance.get(`/report/users`);

    if(response.status !== 200) {
        throw new Error('Failed to fetch report test-drive');
    };

    return response.data;
}


export const useFetchUserListReport = () => {
    return useQuery<UserListResponse>({
        queryKey: ["user-report"],
        queryFn: () => fetchUserList(),        
        retry: 1,
    });
}

