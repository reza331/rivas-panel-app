import { getReportTemplate } from '@/services/reports.service'
import { useQuery } from '@tanstack/react-query'

export default function useReportsTemplateQuery() {
    return useQuery({
        queryKey: ['report_template'],
        queryFn: () => getReportTemplate()
    })
}
