import { Request, Response, NextFunction } from 'express';
import { AssetService } from '../services/asset.service';
import { CreateAssetDto, UpdateAssetDto } from '../types/asset.types';

/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: Manage digital assets
 */
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

/**
 * @swagger
 * /api/assets:
 *   post:
 *     summary: Create a new asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - purchaseDate
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro"
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               purchaseDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-10T00:00:00.000Z"
 *               value:
 *                 type: number
 *                 example: 1200
 *               description:
 *                 type: string
 *                 example: "Apple smartphone purchased from Apple Store"
 *     responses:
 *       201:
 *         description: Asset created
 */
  async createAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const assetData: CreateAssetDto = req.body;
      const asset = await this.assetService.createAsset(assetData);
      res.status(201).json(asset);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/assets:
   *   get:
   *     summary: List all assets
   *     tags: [Assets]
   *     responses:
   *       200:
   *         description: List of assets
   */
  async getAllAssets(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const assets = await this.assetService.getAllAssets();
      res.json(assets);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/assets/{id}:
   *   get:
   *     summary: Get asset by ID
   *     tags: [Assets]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Asset ID
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Asset found
   *       404:
   *         description: Asset not found
   */
  async getAssetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const asset = await this.assetService.getAssetById(id);
      res.json(asset);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/assets/{id}:
   *   put:
   *     summary: Update an asset
   *     tags: [Assets]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Asset ID
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Asset updated
   *       404:
   *         description: Asset not found
   */
  async updateAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateAssetDto = req.body;
      const asset = await this.assetService.updateAsset(id, updateData);
      res.json(asset);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/assets/{id}:
   *   delete:
   *     summary: Delete an asset
   *     tags: [Assets]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Asset ID
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Asset deleted
   *       404:
   *         description: Asset not found
   */
  async deleteAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.assetService.deleteAsset(id);
      res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
