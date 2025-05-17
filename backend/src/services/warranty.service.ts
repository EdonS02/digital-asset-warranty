import {
    NotFoundException,
    InternalServerErrorException,
    HttpException,
  } from '../exceptions/HttpException';
  import { PrismaClient, WarrantyQuote } from '@prisma/client';
  import { WarrantyQuoteRequest } from '../types/warranty.types';
  
  const prisma = new PrismaClient();
  
  const CATEGORY_RATES: Record<string, number> = {
    electronics: 0.02,
    watches: 0.03,
    furniture: 0.015,
    default: 0.025,
  };
  
  export class WarrantyService {
    async generateQuote(request: WarrantyQuoteRequest): Promise<WarrantyQuote> {
      try {
        const asset = await prisma.asset.findUnique({
          where: { id: request.assetId },
        });
  
        if (!asset) {
          throw new NotFoundException(`Asset with ID ${request.assetId} not found`);
        }
  
        const rate =
          CATEGORY_RATES[asset.category.toLowerCase() as keyof typeof CATEGORY_RATES] ||
          CATEGORY_RATES.default;
  
        const quoteAmount = asset.value * rate;
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 30);
  
        const createdQuote = await prisma.warrantyQuote.create({
          data: {
            assetId: asset.id,
            quoteAmount,
            providerName: 'AssetGuard Insurance',
            validUntil,
          },
        });
  
        if (!createdQuote) {
          throw new InternalServerErrorException('Failed to generate warranty quote');
        }
  
        return createdQuote;
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
  
        throw new InternalServerErrorException('Failed to generate warranty quote');
      }
    }
  
    async getQuotesByAssetId(assetId: string): Promise<WarrantyQuote[]> {
      try {
        const quotes = await prisma.warrantyQuote.findMany({
          where: { assetId },
        });
  
        return quotes;
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch warranty quotes for asset');
      }
    }
  
    async getAllQuotes(): Promise<WarrantyQuote[]> {
      try {
        const quotes = await prisma.warrantyQuote.findMany({
          include: {
            asset: true,
          },
        });
  
        return quotes;
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch all warranty quotes');
      }
    }
  }
  