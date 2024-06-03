import { PaginationSearchDto } from "./pagination";

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

export interface CorpSearchDto extends PaginationSearchDto {
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