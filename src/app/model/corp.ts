
export interface Corp {
    id: number;
    code: string;
    name: string;
    logo: string;
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
    debtToEquityRatio: number;
    quickRatio: number;
    reserveRatio: number;
    dividendPerShare: number;
    revenuePerYearIncreaseRatio: number;
    netProfitPerYearIncreaseRatio: number;
    operatingProfitIncreaseRatio: number;
    netProfitIncreaseRatio: number;
    continuousIncreaseNetProfit: number;
    continuousIncreaseOperatingProfit: number;
    continuousincreaseDividends: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CorpSearchDto {
    term?: string;
    revenuePerYearIncreaseRatio?: number;
    netProfitPerYearIncreaseRatio?: number;
    per?: number;
    netProfitIncreaseRatio?: number;
    continuousIncreaseNetProfit?: number;
    roe?: number;
    continuousIncreaseOperatingProfit?: number;
    operatingProfitIncreaseRatio?: number;
    pbr?: number;
    continuousincreaseDividends?: number;
}

export interface StockPrice {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    corp: Corp;
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface StockPriceSearchDto {
    page: number;
    limit: number;
    code: string;
}