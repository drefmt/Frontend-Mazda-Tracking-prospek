import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FeedbackData {
  customerName: string;
  rating: number;
  message: string;
}

interface FeedbackPayload {
  token: string;
  feedbackData: FeedbackData;
}

const createFeedback = async (token: string, feedbackData: FeedbackData) => {
  const response = await axiosInstance.post(`/feedback/${token}`, feedbackData);

  // if (response.status !== 201) {
  //   throw new Error("Failed to create feedback");
  // }

  // console.log("AxiosInstance BaseURL:", axiosInstance.defaults.baseURL);
  return response.data;
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, feedbackData }: FeedbackPayload) =>
      createFeedback(token, feedbackData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback-links"] });
    },

    onError: (error: Error) => {
      console.error("Error creating feedback:", error);
    },
  });
};
