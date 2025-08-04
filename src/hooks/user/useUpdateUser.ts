import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () =>
  useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosInstance.put(`/users/${id}`, data);
      return res.data;
    },
  });