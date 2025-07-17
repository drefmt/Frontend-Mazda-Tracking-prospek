import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notifId: string) => {
      const res = await axiosInstance.delete(`/notification/${notifId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospect-reminder"] });
    },
    onError: (err) => {
      console.error("Gagal menghapus notifikasi:", err);
    },
  });
};
