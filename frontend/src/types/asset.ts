export interface Asset {
    id: string;
    name: string;
    category: string;
    purchaseDate: string;
    value: number;
    description?: string;
    createdAt: string;
    updatedAt: string;
    warrantyQuotes?: WarrantyQuote[];
}

export interface CreateAssetDto {
    name: string;
    category: string;
    purchaseDate: string;
    value: number;
    description?: string;
}

export interface UpdateAssetDto extends Partial<CreateAssetDto> {}

export interface WarrantyQuote {
    id: string;
    assetId: string;
    quoteAmount: number;
    providerName: string;
    validUntil: string;
    createdAt: string;
} 