PRAGMA foreign_keys = ON;

CREATE TABLE users(
  username VARCHAR(20) NOT NULL,
  password VARCHAR(40) NOT NULL,
  level INT NOT NULL,
  PRIMARY KEY(username)
);

CREATE TABLE exercises(
    exerciseType VARCHAR(30) NOT NULL,
    exercisePath VARCHAR(50) NOT NULL,
    textDescription VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    timeSignature VARCHAR(20),
    concepts VARCHAR(255) NOT NULL,
    answer VARCHAR(25) NOT NULL
);

CREATE TABLE learningPages(
  level INT NOT NULL,
  pageIndex INT NOT NULL,
  title VARCHAR(50) NOT NULL
);
