/*
  Warnings:

  - You are about to drop the column `site_id` on the `Checks` table. All the data in the column will be lost.
  - Added the required column `siteId` to the `Checks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checks" DROP COLUMN "site_id",
ADD COLUMN     "siteId" TEXT NOT NULL;
