'use client'

import RevenueChart from "@/components/report-page/revenue-chart"
import TopProductsChart from "@/components/report-page/top-products-chart"
import useAnalyticsQuery from "@/hooks/api/useAnalyticsQuery"

export default function AnalyticsPage() {

  const { data } = useAnalyticsQuery()

  if (!data?.data.data) return null

  return (
    <div>
      <RevenueChart data={data.data.data.trend} />
      <TopProductsChart data={data.data.data.topProducts} />
    </div>
  )
}
