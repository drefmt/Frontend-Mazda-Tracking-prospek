import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TestDriveReport } from "@/interface/testDrive.interface"
import { ReportParams } from "@/interface/ReportPrams.interface";

const fetchTestDriveReport = async({month, year}: ReportParams): Promise<TestDriveReport> => {
    const response = await axiosInstance.get(`/report/test-drive`, {
        params: { month, year },
    });

    if(response.status !== 200) {
        throw new Error('Failed to fetch report test-drive');
    };

    return response.data;
}


export const useFetchTestDriveReport = (month: number, year: number, enabled = true) => {
    return useQuery<TestDriveReport>({
        queryKey: ["testDrive-report", month, year],
        queryFn: () => fetchTestDriveReport({ month, year }),
        enabled: enabled && !!month && !!year,
        retry: 1,
    });
}

