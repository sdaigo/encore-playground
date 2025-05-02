/*
  Warnings:

  - You are about to drop the `Site` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Site";

-- CreateTable
CREATE TABLE "Checks" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "up" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Checks_pkey" PRIMARY KEY ("id")
);
