-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[],
    "videoUrl" TEXT NOT NULL,
    "imagesUrl" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "public"."Project"("id");
