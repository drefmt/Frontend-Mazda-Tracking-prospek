import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { FeedbackLink } from "@/interface/feedback.interface";

const fetchFeedbackLink = async (): Promise<FeedbackLink[]> => {
  const response = await axiosInstance.get("/feedback");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (response.status !== 200) {
    throw new Error("Failed to fetch feedback data");
  }
  console.log(response.data);
  return response.data;
};

export const useFetchFeedbackLink = () => {
  return useQuery<FeedbackLink[]>({
    queryKey: ["Feedback-links"],
    queryFn: fetchFeedbackLink,
    retry: 1,
  });
};
