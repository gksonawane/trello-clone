/*
  Warnings:

  - Added the required column `imageFullUrl` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLinkHTML` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageThumbUrl` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUserName` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `board` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageFullUrl` TEXT NOT NULL,
    ADD COLUMN `imageId` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageLinkHTML` TEXT NOT NULL,
    ADD COLUMN `imageThumbUrl` TEXT NOT NULL,
    ADD COLUMN `imageUserName` TEXT NOT NULL,
    ADD COLUMN `orgId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
