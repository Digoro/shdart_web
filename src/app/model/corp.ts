export interface Corp {
    id: number;
    name: string;
    market: string;
    industry: string;
    createdAt: Date;
    updatedAt: Date;
    finance: Finance;
    finances: Finance[];
}

export interface Finance {
    id: number;
    corp: Corp;
    year: number;
    fullRevenue: number;
    operatingProfit: number;
    netIncome: number;
    operatingProfitMargin: number;
    netProfitMargin: number;
    roe: number;
    eps: number;
    per: number;
    bps: number;
    pbr: number;
    dividendPerShare: number;
    createdAt: Date;
    updatedAt: Date;
}