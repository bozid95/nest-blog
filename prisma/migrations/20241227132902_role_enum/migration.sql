/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role_Enum" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role_Enum" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Role";
