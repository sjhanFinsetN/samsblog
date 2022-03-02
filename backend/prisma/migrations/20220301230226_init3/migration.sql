/*
  Warnings:

  - Added the required column `thumbsUp` to the `Post` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE `User` ADD COLUMN `utype` CHAR(2) NOT NULL DEFAULT 'U';
