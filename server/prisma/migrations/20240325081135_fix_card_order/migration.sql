-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "cards_order_seq";
