/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Project";

-- CreateTable
CREATE TABLE "public"."Projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[],
    "videoUrl" TEXT NOT NULL,
    "imagesUrl" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_id_key" ON "public"."Projects"("id");
