-- CreateTable
CREATE TABLE "Live" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "liveDate" TIMESTAMP(3),
    "memo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Live_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SetlistSong" (
    "id" UUID NOT NULL,
    "liveId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "memo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SetlistSong_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SetlistSong" ADD CONSTRAINT "SetlistSong_liveId_fkey" FOREIGN KEY ("liveId") REFERENCES "Live"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
