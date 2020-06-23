CREATE TABLE "kittens"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(120) NOT NULL,
	"email" VARCHAR(240) NOT NULL
);

INSERT INTO "kittens" ("name", "email")
VALUES('Axel Walker', 'awalk@aol.com');

INSERT INTO "kittens" ("name", "email")
VALUES('Jaden Reklaw', 'jr@hotmail.com');

INSERT INTO "kittens" ("name", "email")
VALUES('Kelsey Bean', 'kbean@yahoo.com');