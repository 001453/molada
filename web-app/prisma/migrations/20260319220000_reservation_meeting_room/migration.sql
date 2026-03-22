-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN "meetingRoomId" INTEGER;

-- Eski tek "toplantı odası" kayıtları büyük odaya (12 kişi) eşlensin
UPDATE "Reservation" SET "meetingRoomId" = 3 WHERE "resourceType" = 'MEETING_ROOM' AND "meetingRoomId" IS NULL;
