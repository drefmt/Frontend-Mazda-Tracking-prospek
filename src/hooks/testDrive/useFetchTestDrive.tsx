import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { TestDrive } from "@/interface/testDrive.interface";

const fetchTestDrive = async (): Promise<TestDrive[]> => {
  const response = await axiosInstance.get("/test-drive");
  return response.data;
};

export const useFetchTestDrive = () => {
  return useQuery<TestDrive[]>({
    queryKey: ["test-drive"],
    queryFn: fetchTestDrive,
    retry: 1,
  });
};
