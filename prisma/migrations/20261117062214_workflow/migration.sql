-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- AlterTable
ALTER TABLE "verifications" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();

-- CreateTable
CREATE TABLE "workflows" (
    "id" UUID NOT NULL DEFAULT pg_catalog.gen_random_uuid(),
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);
