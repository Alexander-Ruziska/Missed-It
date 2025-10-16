CREATE TABLE "event"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "start_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "end_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "location" BIGINT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "organizer" VARCHAR(255) NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" BIGINT NULL,
    "start_date" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "end_date" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT '1',
    "cover_photo" TEXT NULL,
    "photo_1" TEXT NULL,
    "photo_2" TEXT NULL,
    "photo_3" TEXT NULL,
    "facebook" TEXT NULL,
    "instagram" TEXT NULL,
    "website" TEXT NULL,
    "linkedin" TEXT NULL,
    "twitter" TEXT NULL,
    "threads" TEXT NULL
);
ALTER TABLE
    "event" ADD PRIMARY KEY("id");
CREATE TABLE "user"(
    "id" BIGINT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" INTEGER NULL,
    "photo" TEXT NULL,
    "role" VARCHAR(255) CHECK
        (
            "role" IN(
                'community_member',
                'basic_user',
                'paid_user'
            )
        ) NOT NULL DEFAULT 'community_member',
        "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        "organization_name" VARCHAR(255) NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "event_asset"(
    "id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "event_asset" ADD PRIMARY KEY("id");
CREATE TABLE "event_category"(
    "id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL
);
ALTER TABLE
    "event_category" ADD PRIMARY KEY("id");
CREATE TABLE "category"(
    "id" BIGINT NOT NULL,
    "arts" BIGINT NOT NULL,
    "business" BIGINT NOT NULL,
    "concerts" BIGINT NOT NULL,
    "markets" BIGINT NOT NULL,
    "family" BIGINT NOT NULL,
    "other" BIGINT NOT NULL
);
ALTER TABLE
    "category" ADD PRIMARY KEY("id");
CREATE TABLE "comment"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "comment" ADD PRIMARY KEY("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "event_category" ADD CONSTRAINT "event_category_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("id");
ALTER TABLE
    "event_asset" ADD CONSTRAINT "event_asset_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "event"("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "event"("id");
ALTER TABLE
    "event" ADD CONSTRAINT "event_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "event_category" ADD CONSTRAINT "event_category_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "event"("id");