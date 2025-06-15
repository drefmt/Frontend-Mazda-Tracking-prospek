import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface TestDriveData {
    prospekId: string;    
    dateTestDrive: string;
    carType: string;    
}

const editTestDrive = async (id: string, testDriveData: TestDriveData) => {
    const response = await axiosInstance.put(`/test-drive/${id}`, testDriveData);
    return response.data;
}

export const useEditTestDrive = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, testDriveData }: { id: string; testDriveData: TestDriveData }) => editTestDrive(id, testDriveData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["test-drive"] });
        },
        onError: (error: Error) => {
            console.log("Error editing test drive", error);
        }
    });
}
