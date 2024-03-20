/*
  Warnings:

  - Added the required column `boardName` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "boardName" TEXT NOT NULL;
