
'use client'

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

interface SalesTrend {
    day: number
    revenue: number
    orders: number
}

interface RevenueChartProps {
    data: SalesTrend[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="w-full rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
            <h2 className="mb-5 text-lg font-semibold">
                Revenue Chart
            </h2>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis
                            dataKey="day"
                            tickFormatter={(value) => `Day ${value}`}
                        />

                        <YAxis
                            width={75}
                            tickFormatter={(value) => value }
                        />

                        <Tooltip
                            formatter={(value) => [
                                value,
                                'income',
                            ]}
                            labelFormatter={(label) => `روز ${label}`}
                        />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            name="درآمد"
                            stroke="#16a34a"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
