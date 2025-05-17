import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import assetRoutes from './routes/asset.routes';
import warrantyRoutes from './routes/warranty.routes';
import { specs } from './swagger';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './middlewares/logger.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    
app.use(logger);

app.use('/api/assets', assetRoutes);
app.use('/api/warranty-quotes', warrantyRoutes);

app.use(errorHandler);

export default app;
