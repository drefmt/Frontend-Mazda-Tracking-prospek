import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/interface/notification.interface"


const fetchProspectReminder = async(): Promise<Notification[]> => {
    const response = await axiosInstance.get('notification');
    // console.log(response.data);
    if(response.status !== 200) {
        throw new Error("Failed To Fetch Notification");
    }
    return response.data;
}


export const useFetchReminder = () => {
    return useQuery<Notification[]>({
        queryKey: ['prospect-reminder'],
        queryFn: fetchProspectReminder,
        retry: 1,
    });
};