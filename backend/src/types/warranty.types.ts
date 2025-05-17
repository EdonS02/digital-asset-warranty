export interface WarrantyQuoteRequest {
    assetId: string;
}

export interface WarrantyQuoteResponse {
    id: string;
    assetId: string;
    quoteAmount: number;
    providerName: string;
    validUntil: Date;
    createdAt: Date;
} 