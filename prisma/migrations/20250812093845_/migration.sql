/*
  Warnings:

  - Added the required column `description_en` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Projects" ADD COLUMN     "description_en" TEXT NOT NULL,
ADD COLUMN     "name_en" TEXT NOT NULL;
