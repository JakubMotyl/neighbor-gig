/*
  Warnings:

  - You are about to drop the column `timeframe` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExecutionTime" AS ENUM ('ASAP', 'WITHIN_FEW_DAYS', 'THIS_WEEKEND', 'FLEXIBLE');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "timeframe",
ADD COLUMN     "executionTime" "ExecutionTime" NOT NULL DEFAULT 'FLEXIBLE';
