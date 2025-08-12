import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { FollowUp } from "@/interface/followUp.interface";

const fetchFollowUpById = async (
  prospekId: string,
  followUpId: string,
): Promise<FollowUp> => {
  const response = await axiosInstance.get<{ message: string; data: FollowUp }>(
    `/prospek/${prospekId}/follow-Up/${followUpId}`,
  );
  return response.data.data;
};

export const useFetchFollowUpById = (
  prospekId?: string,
  followUpId?: string,
) => {
  return useQuery<FollowUp>({
    queryKey: ["followUp", prospekId, followUpId],
    queryFn: () => fetchFollowUpById(prospekId!, followUpId!),
    enabled: !!prospekId && !!followUpId,
  });
};
