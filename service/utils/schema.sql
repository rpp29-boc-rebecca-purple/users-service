DROP TABLE IF EXISTS friendship;
DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS usersTest;

CREATE TABLE users (
    user_id serial primary key,
    username varchar not null,
    first_name varchar,
    last_name varchar,
    email varchar not null unique,
    age int,
    snack varchar,
    animal_type varchar,
    follower_count int not null default 0,
    following_count int not null default 0,
    thumbnail_url bytea,
    oauth boolean default false,
    password_hash varchar
);

CREATE TABLE friendship (
  friendshipId SERIAL UNIQUE,
  user_id INT,
  friend_id INT,
  CreatedDateTime TIMESTAMP,

  CONSTRAINT fk_friendship PRIMARY KEY (user_id, friend_id),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_friend FOREIGN KEY (friend_id) REFERENCES users(user_id)
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- # \i service/utils/schema.sql
INSERT INTO users (username, first_name, last_name, email, age, password_hash) VALUES ('meowmeow', 'Cat', 'Catsiki', 'meow@dog.com', 2, 'test123');
INSERT INTO users (username, first_name, last_name, email, age, password_hash) VALUES ('Huehue', 'Duck', 'Quackie', 'quack@dog.com', 2, 'test123');
INSERT INTO users (username, first_name, last_name, email, age, password_hash) VALUES ('Doggo', 'Pupperovich', 'Pupper', 'avav@dog.com', 2, 'test123');