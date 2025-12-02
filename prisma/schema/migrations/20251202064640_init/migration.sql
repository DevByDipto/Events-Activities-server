-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "hostId" TEXT NOT NULL DEFAULT '244b075b-4f6b-4ff8-907d-bceed0e65cea';

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
