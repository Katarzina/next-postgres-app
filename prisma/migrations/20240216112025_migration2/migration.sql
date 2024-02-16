/*
  Warnings:

  - You are about to drop the `Establishment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Establishment";

-- CreateTable
CREATE TABLE "establishment" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "establishment_pkey" PRIMARY KEY ("id")
);
