import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('ph-needle', 'ph-pen-nib', 'ph-eraser', 'ph-chat-circle-dots', 'ph-drop', 'ph-sparkle', 'ph-shield-check', 'ph-heart');
  CREATE TYPE "public"."enum_bookings_status" AS ENUM('uj', 'felvettuk', 'lezarva');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_services_icon" DEFAULT 'ph-needle' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"bodypart" varchar,
  	"size" varchar,
  	"idea" varchar NOT NULL,
  	"reference_image_id" integer,
  	"status" "enum_bookings_status" DEFAULT 'uj',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"gallery_id" integer,
  	"bookings_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_text" varchar DEFAULT 'Kecskemét, Kisfaludy Utca 2.' NOT NULL,
  	"heading_line1" varchar DEFAULT 'BLACK HEART' NOT NULL,
  	"heading_line2" varchar DEFAULT 'TATTOO' NOT NULL,
  	"subtitle" varchar DEFAULT 'Egyedi tetoválások, kézzel tervezve. Sötét, merész vizualitás és kompromisszummentes minőség a város szívében.' NOT NULL,
  	"cta_primary_text" varchar DEFAULT 'Konzultáció kérése' NOT NULL,
  	"cta_primary_link" varchar DEFAULT '#kapcsolat' NOT NULL,
  	"cta_secondary_text" varchar DEFAULT 'Portfólió' NOT NULL,
  	"cta_secondary_link" varchar DEFAULT '#galeria' NOT NULL,
  	"side_text" varchar DEFAULT 'EST 2019',
  	"background_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"services_heading_line1" varchar DEFAULT 'Kreatív' NOT NULL,
  	"services_heading_line2" varchar DEFAULT 'Arzenál' NOT NULL,
  	"services_intro" varchar DEFAULT 'Nem sablonokból dolgozunk. Minden munka egyedi vízió alapján készül, ami rád van szabva.' NOT NULL,
  	"gallery_heading" varchar DEFAULT 'PORTFÓLIÓ' NOT NULL,
  	"gallery_cta_text" varchar DEFAULT 'Több munka Facebookon' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_prefix" varchar DEFAULT 'A TINTA MÖGÖTT:' NOT NULL,
  	"heading_highlight" varchar DEFAULT 'JUDIT' NOT NULL,
  	"image_id" integer NOT NULL,
  	"badge_title" varchar DEFAULT 'EST. 2019' NOT NULL,
  	"badge_subtitle" varchar DEFAULT 'Kecskemét' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" varchar NOT NULL,
  	"hours" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_prefix" varchar DEFAULT 'LÉPJ BE A' NOT NULL,
  	"heading_highlight" varchar DEFAULT 'STÚDIÓBA.' NOT NULL,
  	"description" varchar DEFAULT 'Minden egy beszélgetéssel kezdődik. Írd le az ötletedet, és hamarosan felveszem veled a kapcsolatot egy személyes konzultáció egyeztetésére.' NOT NULL,
  	"address_label" varchar DEFAULT 'Cím' NOT NULL,
  	"address" varchar DEFAULT '6000 Kecskemét,
  Kisfaludy utca 2. (Belváros)' NOT NULL,
  	"contact_label" varchar DEFAULT 'Kapcsolat' NOT NULL,
  	"form_heading" varchar DEFAULT 'Konzultáció Kérése' NOT NULL,
  	"form_submit_text" varchar DEFAULT 'Küldés és Egyeztetés' NOT NULL,
  	"form_disclaimer" varchar DEFAULT 'Az adatok elküldése nem minősül foglalásnak. A megbeszéléshez felvesszük veled a kapcsolatot.',
  	"map_embed_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_text" varchar DEFAULT 'BLACK HEART' NOT NULL,
  	"footer_copyright" varchar DEFAULT '© 2026 Black Heart Tattoo Kecskemét. Minden jog fenntartva.' NOT NULL,
  	"owner_name" varchar DEFAULT 'Pintér Judit',
  	"established_label" varchar DEFAULT 'Est. 2019',
  	"phone" varchar DEFAULT '+36 30 123 4567' NOT NULL,
  	"phone_link" varchar DEFAULT '+36301234567' NOT NULL,
  	"facebook_url" varchar DEFAULT 'https://www.facebook.com/blackheartkecskemet',
  	"instagram_url" varchar,
  	"meta_title" varchar DEFAULT 'Black Heart Tattoo | Egyedi tetoválás Kecskeméten',
  	"meta_description" varchar DEFAULT 'Egyedi tetoválás, tervezés, konzultáció és fedés Kecskemét belvárosában. Black Heart Tattoo - Pintér Judit, 2019 óta.',
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_reference_image_id_media_id_fk" FOREIGN KEY ("reference_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero" ADD CONSTRAINT "hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_paragraphs" ADD CONSTRAINT "about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_stats" ADD CONSTRAINT "about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_opening_hours" ADD CONSTRAINT "contact_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_nav_links" ADD CONSTRAINT "settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "gallery__order_idx" ON "gallery" USING btree ("_order");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "bookings_reference_image_idx" ON "bookings" USING btree ("reference_image_id");
  CREATE INDEX "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_background_image_idx" ON "hero" USING btree ("background_image_id");
  CREATE INDEX "about_paragraphs_order_idx" ON "about_paragraphs" USING btree ("_order");
  CREATE INDEX "about_paragraphs_parent_id_idx" ON "about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_stats_order_idx" ON "about_stats" USING btree ("_order");
  CREATE INDEX "about_stats_parent_id_idx" ON "about_stats" USING btree ("_parent_id");
  CREATE INDEX "about_image_idx" ON "about" USING btree ("image_id");
  CREATE INDEX "contact_opening_hours_order_idx" ON "contact_opening_hours" USING btree ("_order");
  CREATE INDEX "contact_opening_hours_parent_id_idx" ON "contact_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "settings_nav_links_order_idx" ON "settings_nav_links" USING btree ("_order");
  CREATE INDEX "settings_nav_links_parent_id_idx" ON "settings_nav_links" USING btree ("_parent_id");
  CREATE INDEX "settings_og_image_idx" ON "settings" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "bookings" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "sections" CASCADE;
  DROP TABLE "about_paragraphs" CASCADE;
  DROP TABLE "about_stats" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "contact_opening_hours" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "settings_nav_links" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_bookings_status";`)
}
