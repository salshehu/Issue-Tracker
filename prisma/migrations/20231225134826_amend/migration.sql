-- AlterTable
ALTER TABLE "Debugging" ALTER COLUMN "completed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Developers" ALTER COLUMN "contract" SET DEFAULT 'FULL_TIME',
ALTER COLUMN "profilePic" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
