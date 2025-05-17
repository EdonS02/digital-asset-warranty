import { Router } from 'express';
import { WarrantyController } from '../controllers/warranty.controller';
import { WarrantyService } from '../services/warranty.service';

const router = Router();
const warrantyService = new WarrantyService();
const warrantyController = new WarrantyController(warrantyService);

router.post('/', warrantyController.generateQuote.bind(warrantyController));
router.get('/asset/:assetId', warrantyController.getQuotesByAssetId.bind(warrantyController));
router.get('/', warrantyController.getAllQuotes.bind(warrantyController));

export default router;
