/*
  Warnings:

  - You are about to drop the column `UserId` on the `bank_accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "UserId";

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
