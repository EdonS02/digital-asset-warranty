import { NotFoundException, BadRequestException, InternalServerErrorException, HttpException } from '../exceptions/HttpException';
import { Asset, PrismaClient } from '@prisma/client';
import { CreateAssetDto, UpdateAssetDto } from '../types/asset.types';

const prisma = new PrismaClient();

export class AssetService {
    async createAsset(data: CreateAssetDto): Promise<Asset> {
        try {
            const createdAsset = await prisma.asset.create({
                data: {
                    ...data,
                    purchaseDate: new Date(data.purchaseDate)
                }
            });

            if (!createdAsset) {
                throw new InternalServerErrorException('Failed to create asset');
            }

            return createdAsset;
        } catch (error: any) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException('Failed to create asset');
        }
    }

    async getAllAssets(): Promise<Asset[]> {
        try {
            const assets = await prisma.asset.findMany({
                include: {
                    warrantyQuotes: true,
                },
            });

            return assets;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch assets');
        }
    }

    async getAssetById(id: string): Promise<Asset> {
        try {
            const asset = await prisma.asset.findUnique({
                where: { id },
                include: {
                    warrantyQuotes: true,
                },
            });

            if (!asset) {
                throw new NotFoundException(`Asset with ID ${id} not found`);
            }

            return asset;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to fetch asset');
        }
    }

    async updateAsset(id: string, data: UpdateAssetDto): Promise<Asset> {
        try {
            const exists = await prisma.asset.findUnique({ where: { id } });
            if (!exists) {
                throw new NotFoundException(`Asset with given id not found`);
            }

            const updatedAsset = await prisma.asset.update({
                where: { id },
                data: {
                    ...data,
                    purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : undefined,
                },
            });

            return updatedAsset;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to update asset');
        }
    }

    async deleteAsset(id: string): Promise<string> {
        try {
          const asset = await prisma.asset.findUnique({ where: { id } });
      
          if (!asset) {
            throw new NotFoundException(`Asset with given id not found`);
          }
      
          await prisma.asset.delete({ where: { id } });
      
          return 'Asset deleted successfully';
        } catch (error) {
          if (error instanceof HttpException) {
            throw error; 
          }
      
          throw new InternalServerErrorException('Failed to delete asset');
        }
      }
}