/*
  Warnings:

  - You are about to drop the column `userId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_userId_fkey";

-- DropIndex
DROP INDEX "image_userId_key";

-- AlterTable
ALTER TABLE "image" DROP COLUMN "userId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "user";
