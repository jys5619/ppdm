CREATE TABLE "USER" (
	"ID"	varchar NOT NULL,
	"CREATED_AT"	datetime DEFAULT (datetime('now')),
	"UPDATED_AT"	datetime DEFAULT (datetime('now')),
	"name"	varchar(100) NOT NULL,
	"EMAIL"	varchar(100) NOT NULL
	PRIMARY KEY("ID"),
	CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE("EMAIL")
);
