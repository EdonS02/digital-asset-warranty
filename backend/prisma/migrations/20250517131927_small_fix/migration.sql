-- DropForeignKey
ALTER TABLE "WarrantyQuote" DROP CONSTRAINT "WarrantyQuote_assetId_fkey";

-- AlterTable
ALTER TABLE "WarrantyQuote" ALTER COLUMN "assetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WarrantyQuote" ADD CONSTRAINT "WarrantyQuote_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
