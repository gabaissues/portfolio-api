/*
  Warnings:

  - Added the required column `type` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectType" AS ENUM ('dev', 'ui');

-- AlterTable
ALTER TABLE "public"."Projects" ADD COLUMN     "type" "public"."ProjectType" NOT NULL;
