import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestDriveDataRequest } from "@/interface/testDrive.interface"

const createTestDrive = async (testDriveData: TestDriveDataRequest) => {
  const response = await axiosInstance.post("/test-drive", testDriveData);

  return response.data;
};

export const useCreateTestDrive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTestDrive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test-drive"] });
    },
  });
};
