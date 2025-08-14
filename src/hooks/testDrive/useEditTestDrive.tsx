import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TestDriveDataRequest } from "@/interface/testDrive.interface";

const editTestDrive = async (id: string, testDriveData: TestDriveDataRequest) => {
  const response = await axiosInstance.put(`/test-drive/${id}`, testDriveData);
  return response.data;
};

export const useEditTestDrive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      testDriveData,
    }: {
      id: string;
      testDriveData: TestDriveDataRequest;
    }) => editTestDrive(id, testDriveData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test-drive"] });
    },
    onError: (error: Error) => {
      console.log("Error editing test drive", error);
    },
  });
};
