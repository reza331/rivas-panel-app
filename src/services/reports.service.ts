import { SalesAnalyticsResponse } from "@/types/report.type"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const reportSummary = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/reports/summary`, {
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await res.json()

    console.log(data);

    return { data, res }

}


export const createReportTemplate = async ({ name, dataset, fields }: { name: string, dataset: string, fields: string[] }) => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/reports/templates`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, dataset, fields })
    })

    const data = await res.json()

    console.log(data);

    return { data, res }

}


export const getReportTemplate = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/reports/templates`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })

    const data = await res.json()

    console.log(data);

    return { data, res }

}

export default async function exportReport(templateId: string) {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(
        `${baseUrl}/reports/templates/${templateId}/export`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    )

    if (!res.ok) {
        throw new Error('Failed to export report')
    }

    return res.blob()
}


export const getAnalytics = async () => {

    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${baseUrl}/analytics/sales`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })

    const data:SalesAnalyticsResponse = await res.json()

    console.log(data);

    return { data, res }

}





