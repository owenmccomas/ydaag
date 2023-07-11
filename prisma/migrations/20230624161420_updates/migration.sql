/*
  Warnings:

  - You are about to drop the column `userId` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_userId_fkey";

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "userId",
ADD COLUMN     "clerk_id" TEXT;

-- DropTable
DROP TABLE "users";
