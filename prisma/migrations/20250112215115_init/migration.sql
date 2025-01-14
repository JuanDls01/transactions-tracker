-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('LEISURE', 'HEALTH', 'HOME', 'SUBSCRIPTIONS', 'CAR', 'FOOD', 'SAVINGS', 'EDUCATION', 'TRAVEL', 'WORK', 'MISCELLANEOUS');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('ARS', 'BTC', 'USD', 'USDT');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL DEFAULT 'INCOME',
    "currency" "Currency" NOT NULL DEFAULT 'ARS',
    "category" "TransactionCategory" NOT NULL,
    "description" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
