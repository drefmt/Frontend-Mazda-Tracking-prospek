import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notifId: string) => {
      const res = await axiosInstance.patch(`/notification/${notifId}/read`);
      return res.data;
    },
    onSuccess: () => {
      // Refresh notifikasi setelah berhasil
      queryClient.invalidateQueries({ queryKey: ['prospect-reminder'] });
    },
  });
};
