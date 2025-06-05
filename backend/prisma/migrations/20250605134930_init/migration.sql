-- CreateTable
CREATE TABLE "Character" (
    "name" TEXT NOT NULL,
    "minX" DOUBLE PRECISION NOT NULL,
    "maxX" DOUBLE PRECISION NOT NULL,
    "minY" DOUBLE PRECISION NOT NULL,
    "maxY" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("name")
);
