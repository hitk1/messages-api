-- CreateTable
CREATE TABLE "messages" (
    "id" BYTEA NOT NULL,
    "content" VARCHAR(600) NOT NULL,
    "author" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
