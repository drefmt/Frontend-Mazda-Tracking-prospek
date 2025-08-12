import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export type ProspekId = {
  _id: string;
  id: string;
  name: string;
  whatsappNum: string;
  carType: string;
};

export type SalesId = {
  _id: string;
  id: string;
  username: string;
};

export type TestDrive = {
  prospekId: ProspekId;
  salesId: SalesId;
  dateTestDrive: string;
  carType: string;
  id: string;
};

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
