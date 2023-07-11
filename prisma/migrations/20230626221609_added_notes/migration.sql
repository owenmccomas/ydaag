-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "clerk_id" TEXT,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
