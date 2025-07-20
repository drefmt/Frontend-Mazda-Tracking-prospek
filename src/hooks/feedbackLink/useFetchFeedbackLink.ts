



import { axiosInstance  } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
// import { Activity } from "@/interface/activity.interface";

export interface FeedbackLink {
  id: string;
  token: string;
  used: boolean;
  expiredAt: string;
  createdAt: string;
  retailId: {
    carType: string;
    spkId: {
      prospekId: {
        name: string;
      };
    };
  };
}

const fetchFeedbackLink = async(): Promise<FeedbackLink[]> => {
    const response = await axiosInstance.get('/feedback');
    if(response.status !== 200 ) {
        throw new Error('Failed to fetch feedback data');
    }
    return response.data;
}


export const useFetchFeedbackLink = () => {
    return useQuery<FeedbackLink[]> ({
        queryKey: ['Feedback-links'],
        queryFn: fetchFeedbackLink,
        retry: 1,
    });
};

