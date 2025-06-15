import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface TestDriveData {
    prospekId: string;
    salesId: string;
    dateTestDrive: string;
    carType: string;    
}

const createTestDrive = async (testDriveData: TestDriveData) => {
    const response = await axiosInstance.post('/test-drive', testDriveData);

    return response.data;
};

export const useCreateTestDrive = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTestDrive,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["test-drive"]});
        },
    });
};
