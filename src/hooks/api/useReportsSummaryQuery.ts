import { reportSummary } from '@/services/reports.service'
import { useQuery } from '@tanstack/react-query'

export default function useReportsSummaryQuery() {
    return useQuery({
        queryKey: ['report-summary'],
        queryFn: reportSummary
    })
}
