import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TestDrive } from "@/interface/testDrive.interface"


const fetchTestDriveById = async(id:string): Promise<TestDrive> => {
    const response = await axiosInstance.get(`test-drive/${id}`);
    return response.data;
}


export const useFetchTestDriveById = (id?: string) => {
    return useQuery<TestDrive, Error>({
        queryKey: ["test-drive", id],
        queryFn: () => fetchTestDriveById(id!),
        enabled: !!id,
        retry: 1,
    })

}