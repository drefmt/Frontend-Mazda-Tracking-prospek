import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ReportParams } from "@/interface/ReportPrams.interface";
import { FollowUp } from "@/interface/followUp-report.interface"


const fetchFollowUpReport = async({month, year}: ReportParams): Promise<FollowUp[]> => {
    const response = await axiosInstance.get(`/report/follow-up`, {
        params: { month, year },
    });

    if(response.status !== 200) {
        throw new Error('Failed to fetch report test-drive');
    };

    return response.data.data;
}


export const useFetchFollowUpReport = (month: number, year: number, enabled = true) => {
    return useQuery<FollowUp[]>({
        queryKey: ["followUp-report", month, year],
        queryFn: () => fetchFollowUpReport({ month, year }),
        enabled: enabled && !!month && !!year,
        retry: 1,
    });
}

