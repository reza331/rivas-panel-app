
'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

interface TopProduct {
    id: string
    name: string
    sales: number
}

interface TopProductsChartProps {
    data: TopProduct[]
}

export default function TopProductsChart({
    data,
}: TopProductsChartProps) {
    const sortedProducts = [...data]
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5)

    return (
        <div className="w-full rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
            <h2 className="mb-5 text-lg font-semibold">
                Top Products
            </h2>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={sortedProducts}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />

                        <XAxis type="number" allowDecimals={false} />

                        <YAxis
                            type="category"
                            dataKey="name"
                            width={150}
                            tick={{ fontSize: 11 }}
                        />

                        <Tooltip
                            formatter={(value) => [
                                value,
                                'Sold',
                            ]}
                        />

                        <Bar
                            dataKey="sales"
                            name="sales"
                            fill="#16a34a"
                            radius={[0, 5, 5, 0]}
                            barSize={24}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
