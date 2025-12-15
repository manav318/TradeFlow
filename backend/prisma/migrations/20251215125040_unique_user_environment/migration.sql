/*
  Warnings:

  - A unique constraint covering the columns `[userId,environment]` on the table `AlpacaCredential` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AlpacaCredential_userId_environment_key" ON "AlpacaCredential"("userId", "environment");
