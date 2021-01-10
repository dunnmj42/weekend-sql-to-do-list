CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY, 
	"task" VARCHAR(255) NOT NULL,
	"timeAdded" DATE,
	"isImportant" BOOLEAN,
	"isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todo" ("task", "timeAdded", "isImportant")
VALUES ('Write this App', current_timestamp, TRUE);
