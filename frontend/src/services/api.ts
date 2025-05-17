import axios from 'axios';
import { Asset, CreateAssetDto, UpdateAssetDto, WarrantyQuote } from '../types/asset';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const AssetService = {
    createAsset: async (data: CreateAssetDto): Promise<Asset> => {
        const response = await api.post<Asset>('/assets', data);
        return response.data;
    },

    getAllAssets: async (): Promise<Asset[]> => {
        const response = await api.get<Asset[]>('/assets');
        return response.data;
    },

    getAssetById: async (id: string): Promise<Asset> => {
        const response = await api.get<Asset>(`/assets/${id}`);
        return response.data;
    },

    updateAsset: async (id: string, data: UpdateAssetDto): Promise<Asset> => {
        const response = await api.put<Asset>(`/assets/${id}`, data);
        return response.data;
    },

    deleteAsset: async (id: string): Promise<void> => {
        await api.delete(`/assets/${id}`);
    },
};

export const WarrantyService = {
    generateQuote: async (assetId: string): Promise<WarrantyQuote> => {
        const response = await api.post<WarrantyQuote>('/warranty-quotes', { assetId });
        return response.data;
    },

    getQuotesByAssetId: async (assetId: string): Promise<WarrantyQuote[]> => {
        const response = await api.get<WarrantyQuote[]>(`/warranty-quotes/asset/${assetId}`);
        return response.data;
    },

    getAllQuotes: async (): Promise<WarrantyQuote[]> => {
        const response = await api.get<WarrantyQuote[]>('/warranty-quotes');
        return response.data;
    },
}; 