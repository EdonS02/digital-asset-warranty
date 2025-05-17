import { Request, Response, NextFunction } from 'express';
import { WarrantyService } from '../services/warranty.service';
import { WarrantyQuoteRequest } from '../types/warranty.types';


export class WarrantyController {

    constructor(private readonly warrantyService: WarrantyService) {}

  /**
   * @swagger
   * /api/warranty-quotes:
   *   post:
   *     summary: Generate a warranty quote for an asset
   *     tags: [Warranty Quotes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               assetId:
   *                 type: string
   *                 format: uuid
   *             required:
   *               - assetId
   *     responses:
   *       201:
   *         description: Warranty quote generated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/WarrantyQuote'
   *       404:
   *         description: Asset not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async generateQuote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const quoteRequest: WarrantyQuoteRequest = req.body;
      const quote = await this.warrantyService.generateQuote(quoteRequest);
      res.status(201).json(quote);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/warranty-quotes/asset/{assetId}:
   *   get:
   *     summary: Get warranty quotes for a specific asset
   *     tags: [Warranty Quotes]
   *     parameters:
   *       - in: path
   *         name: assetId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: Asset ID
   *     responses:
   *       200:
   *         description: List of warranty quotes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/WarrantyQuote'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async getQuotesByAssetId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { assetId } = req.params;
      const quotes = await this.warrantyService.getQuotesByAssetId(assetId);
      res.json(quotes);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/warranty-quotes:
   *   get:
   *     summary: Get all warranty quotes
   *     tags: [Warranty Quotes]
   *     responses:
   *       200:
   *         description: List of all warranty quotes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/WarrantyQuote'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async getAllQuotes(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const quotes = await this.warrantyService.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      next(error);
    }
  }
}
