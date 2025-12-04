/*
  Warnings:

  - You are about to drop the column `eventID` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_eventID_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "eventID",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
