/*
  Warnings:

  - A unique constraint covering the columns `[userId,eventId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_userId_eventId_key" ON "Payment"("userId", "eventId");
