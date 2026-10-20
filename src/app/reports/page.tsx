'use client'
import useReportsSummaryQuery from "@/hooks/api/useReportsSummaryQuery"
import useReportsTemplateQuery from "@/hooks/api/useReportsTemplateQuery"
import exportReport, { createReportTemplate } from "@/services/reports.service"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function ReportPage() {

    const { data } = useReportsSummaryQuery()
    const { data: templateData } = useReportsTemplateQuery()
    const [fields, setFields] = useState<string[]>([])
    const [select, setSelect] = useState('select')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const queryClient = useQueryClient()

    const handleFieldChange = (field: string, checked: boolean) => {
        setFields(prev =>
            checked
                ? [...prev, field]
                : prev.filter(item => item !== field)
        )
    }

    const handleExport = async (templateId: string) => {
        try {
            const blob = await exportReport(templateId)

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            link.download = 'omnicommerce-report.csv'

            document.body.appendChild(link)
            link.click()
            link.remove()

            URL.revokeObjectURL(url)
        } catch (error) {
            console.error(error)
        }
    }

    const createTemplate = async () => {
        if (loading) return
        setLoading(true)
        const { res } = await createReportTemplate({ name, dataset: select, fields })
        if (!res.ok) {
            setLoading(false)
            alert('creating fail')
            return
        }
        setLoading(false)
        queryClient.invalidateQueries({queryKey:['report_template']})
        alert('created successfully')
        return
    }

    if (!data?.data.data) return null

    if (!templateData?.data.data) return null


    return (
        <div className='p-3'>
            <div>Summary:</div>
            {/*  */}
            <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="p-5 pe-10 rounded-2xl bg-B flex justify-between items-center">
                    <div className="font-semibold text-lg">Orders</div>
                    <div>{data.data.data.orders}</div>
                </div>
                <div className="p-5 pe-10 rounded-2xl bg-B flex justify-between items-center">
                    <div className="font-semibold text-lg">Paid Orders</div>
                    <div>{data.data.data.paidOrders}</div>
                </div>
                <div className="p-5 pe-10 rounded-2xl bg-B flex justify-between items-center">
                    <div className="font-semibold text-lg">Revenue</div>
                    <div>{data.data.data.revenue}</div>
                </div>
                <div className="p-5 pe-10 rounded-2xl bg-B flex justify-between items-center">
                    <div className="font-semibold text-lg">Products</div>
                    <div>{data.data.data.products}</div>
                </div>
            </div>
            {/* creat template */}
            <div className="p-5 rounded-2xl bg-B mt-5 flex items-center gap-4">
                <input value={name} onChange={(e) => setName(e.target.value)} className="bg-A rounded-2xl p-3" type="text" placeholder="Template name ..." />
                <select onChange={(e) => setSelect(e.target.value)} value={select} className="bg-A p-3 rounded-2xl">
                    <option value="select">select dataset</option>
                    <option value="orders">orders</option>
                </select>
                <div className="dropdown">
                    <div tabIndex={0} className="bg-A p-3 rounded-2xl cursor-pointer">Select fields</div>
                    <ul tabIndex={-1} className="dropdown-content menu gap-5 bg-B rounded-box z-1 w-fit pt-2 px-5 shadow-sm">
                        {['id', 'status', 'total'].map(field => (
                            <label key={field} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={fields.includes(field)}
                                    onChange={e =>
                                        handleFieldChange(field, e.target.checked)
                                    }
                                />
                                {field}
                            </label>
                        ))}
                    </ul>
                </div>
                <button onClick={createTemplate} disabled={(select === 'select' || fields.length === 0 || !name.trim())} className="btn btn-primary">Creat template</button>
            </div>
            {/* template */}
            <div className="mt-5 flex flex-col gap-5">
                {
                    templateData?.data.data.map((item: any) => {
                        return (
                            <div className="bg-B p-5 rounded-2xl flex items-center justify-between">
                                <div>{item.name}</div>
                                <button onClick={() => handleExport(item.id)} className="btn btn-primary btn-sm">Export</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
