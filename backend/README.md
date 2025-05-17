# Asset Management System Backend

This is the backend service for the Asset Management System, built with Node.js, Express, TypeScript, and Prisma.

## Features

- Asset Management (CRUD operations)
- Warranty Quote Generation
- PostgreSQL Database with Prisma ORM
- TypeScript Support
- Error Handling
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
DATABASE_URL="postgresql://username:password@localhost:5432/asset_management"
PORT=5000
```

3. Initialize the database:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Build the application:
```bash
npm run build
```

5. Start the server:
```bash
npm run start
```

## API Documentation
Swagger
http://localhost:5000/api-docs

### Assets

#### Create Asset
- POST `/api/assets`
- Body: 
```json
{
  "name": "string",
  "category": "string",
  "purchaseDate": "2024-02-20T00:00:00Z",
  "value": 1000,
  "description": "string"
}
```

#### Get All Assets
- GET `/api/assets`

#### Get Asset by ID
- GET `/api/assets/:id`

#### Update Asset
- PUT `/api/assets/:id`
- Body: Same as create asset (all fields optional)

#### Delete Asset
- DELETE `/api/assets/:id`

### Warranty Quotes

#### Generate Quote
- POST `/api/warranty-quotes`
- Body:
```json
{
  "assetId": "string"
}
```

#### Get Quotes by Asset ID
- GET `/api/warranty-quotes/asset/:assetId`

#### Get All Quotes
- GET `/api/warranty-quotes`


### Available Scripts

- `npm run build`: Build the application
- `npm run start`: Start the production server
- `npm run start:dev`: Start development server with hot-reload
- `npm run test`: Run tests