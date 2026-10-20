export interface SalesAnalyticsResponse {
    data: {
        summary: SalesSummary;
        trend: SalesTrend[];
        topProducts: TopProduct[];
    };
}

export interface SalesSummary {
    orders: number;
    paidOrders: number;
    revenue: number;
    products: number;
    activeProducts: number;
    lowStock: number;
    customers: number;
    returns: number;
}

export interface SalesTrend {
    day: number;
    revenue: number;
    orders: number;
}

export interface TopProduct {
    id: string;
    name: string;
    sales: number;
}