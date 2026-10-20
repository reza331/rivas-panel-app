import { getAnalytics } from "@/services/reports.service";
import { useQuery } from "@tanstack/react-query";

export default function useAnalyticsQuery() {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: () => getAnalytics()
    })
}
