export interface Product {
    name: string;
    price: number;
    expiry_date: Date;
    discount: number;
    retailer: string;
    createdAt: Date;
}

export interface PriceDistributionData {
    range: string;
    count: number;
}

export interface RetailerPieData {
    name: string;
    value: number;
}

export interface DiscountData {
    price: number;
    discount: number;
}