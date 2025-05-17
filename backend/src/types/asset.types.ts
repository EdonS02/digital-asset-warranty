export interface CreateAssetDto {
    name: string;
    category: string;
    purchaseDate: Date;
    value: number;
    description?: string;
}

export interface UpdateAssetDto extends Partial<CreateAssetDto> {}

export interface AssetResponse {
    id: string;
    name: string;
    category: string;
    purchaseDate: Date;
    value: number;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
} 