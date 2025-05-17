import { Router } from 'express';
import { AssetController } from '../controllers/asset.controller';
import { AssetService } from '../services/asset.service';

const router = Router();
const assetService = new AssetService();
const assetController = new AssetController(assetService);

router.post('/', assetController.createAsset.bind(assetController));
router.get('/', assetController.getAllAssets.bind(assetController));
router.get('/:id', assetController.getAssetById.bind(assetController));
router.put('/:id', assetController.updateAsset.bind(assetController));
router.delete('/:id', assetController.deleteAsset.bind(assetController));

export default router;
