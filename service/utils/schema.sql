DROP TABLE IF EXISTS friendship;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username varchar not null,
    first_name varchar,
    last_name varchar,
    email varchar not null unique,
    age int,
    snack varchar,
    follower_count int not null default 0,
    following_count int not null default 0,
    thumbnail bytea,
    oauth boolean default false,
    password_hash varchar not null
);

CREATE TABLE friendship (
  friendshipId SERIAL UNIQUE,
  userEmail VARCHAR,
  friendEmail VARCHAR,
  CreatedDateTime TIMESTAMP,

  CONSTRAINT fk_friendship PRIMARY KEY (userEmail, friendEmail),
  CONSTRAINT fk_user FOREIGN KEY (userEmail) REFERENCES users(email)
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_friend FOREIGN KEY (friendEmail) REFERENCES users(email)
  ON DELETE CASCADE ON UPDATE CASCADE
);