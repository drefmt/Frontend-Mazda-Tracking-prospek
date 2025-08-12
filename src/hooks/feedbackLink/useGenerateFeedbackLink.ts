import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface GenerateFeedbackLinkPayload {
  retailId: string;
}

const generateFeedbackLink = async ({
  retailId,
}: GenerateFeedbackLinkPayload) => {
  const response = await axiosInstance.post(`/feedback/generate`, { retailId });
  return response.data;
};

export const useGenerateFeedbackLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateFeedbackLink,
    onSuccess: () => {
      // Bisa refresh data feedback link jika Anda punya query-nya
      queryClient.invalidateQueries({ queryKey: ["Feedback-links"] });
    },
    onError: (error) => {
      console.error("Error generating feedback link:", error);
    },
  });
};
