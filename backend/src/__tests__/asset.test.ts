import request from 'supertest';
import app from '../app';
import { CreateAssetDto, AssetResponse } from '../types/asset.types';
import { prisma } from './setup';

describe('Asset Endpoints', () => {
  const testAsset: CreateAssetDto = {
    name: 'Test Asset',
    category: 'Electronics',
    purchaseDate: new Date('2024-01-01'),
    value: 1000,
    description: 'Test description'
  };

  beforeEach(async () => {
    await prisma.warrantyQuote.deleteMany();
    await prisma.asset.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/assets', () => {
    it('should create a new asset', async () => {
      const response = await request(app)
        .post('/api/assets')
        .send(testAsset)
        .expect(201);

      expect(response.body).toMatchObject({
        ...testAsset,
        id: expect.any(String),
        purchaseDate: testAsset.purchaseDate.toISOString()
      });
    });
  });

  describe('GET /api/assets', () => {
    beforeEach(async () => {
      await prisma.asset.create({ data: testAsset });
    });

    it('should return all assets', async () => {
      const response = await request(app)
        .get('/api/assets')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toMatchObject({
        ...testAsset,
        purchaseDate: testAsset.purchaseDate.toISOString()
      });
    });
  });

  describe('GET /api/assets/:id', () => {
    let createdAsset: AssetResponse;

    beforeEach(async () => {
      createdAsset = await prisma.asset.create({ data: testAsset });
    });

    it('should return a single asset by ID', async () => {
      const response = await request(app)
        .get(`/api/assets/${createdAsset.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        ...testAsset,
        id: createdAsset.id,
        purchaseDate: testAsset.purchaseDate.toISOString()
      });
    });

    it('should return 404 for non-existent asset', async () => {
      const response = await request(app)
        .get('/api/assets/non-existent-id')
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Asset with ID non-existent-id not found',
        error: 'Not Found'
      });
    });
  });

  describe('PUT /api/assets/:id', () => {
    let createdAsset: AssetResponse;

    beforeEach(async () => {
      createdAsset = await prisma.asset.create({ data: testAsset });
    });

    it('should update an existing asset', async () => {
      const updateData = {
        name: 'Updated Asset Name',
        value: 2000
      };

      const response = await request(app)
        .put(`/api/assets/${createdAsset.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toMatchObject({
        ...testAsset,
        ...updateData,
        id: createdAsset.id,
        purchaseDate: testAsset.purchaseDate.toISOString()
      });
    });

    it('should return 404 for updating non-existent asset', async () => {
      const response = await request(app)
        .put('/api/assets/non-existent-id')
        .send({ name: 'Updated Name' })
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Asset with given id not found',
        error: 'Not Found'
      });
    });
  });

  describe('DELETE /api/assets/:id', () => {
    let createdAsset: AssetResponse;

    beforeEach(async () => {
      createdAsset = await prisma.asset.create({ data: testAsset });
    });

    it('should delete an existing asset', async () => {
      const response = await request(app)
        .delete(`/api/assets/${createdAsset.id}`)
        .expect(200);

      expect(response.body).toEqual({ message: 'Asset deleted successfully' });

      const deletedAsset = await prisma.asset.findUnique({
        where: { id: createdAsset.id }
      });
      expect(deletedAsset).toBeNull();
    });

    it('should return 404 for deleting non-existent asset', async () => {
      const response = await request(app)
        .delete('/api/assets/non-existent-id')
        .expect(404);

      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Asset with given id not found',
        error: 'Not Found'
      });
    });
  });
});
