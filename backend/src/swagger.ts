import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Asset Management API',
            version: '1.0.0',
            description: 'API documentation for Asset Management System',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Asset: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        category: { type: 'string' },
                        purchaseDate: { type: 'string', format: 'date-time' },
                        value: { type: 'number' },
                        description: { type: 'string', nullable: true },
                    },
                    required: ['name', 'category', 'purchaseDate', 'value'],
                },
                WarrantyQuote: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        assetId: { type: 'string', format: 'uuid' },
                        quoteAmount: { type: 'number' },
                        providerName: { type: 'string' },
                        validUntil: { type: 'string', format: 'date-time' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./src/controllers/*.ts'], 
};

export const specs = swaggerJsdoc(options); 