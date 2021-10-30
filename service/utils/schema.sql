CREATE TABLE users (
  userId INT NOT NULL,
  username VARCHAR NOT NULL,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  age: INT,
  snack: VARCHAR,
  password_hash VARCHAR,
  followers INT NOT NULL DEFAULT 0,
  following INT NOT NULL DEFAULT 0,

  PRIMARY KEY (username)
);

CREATE TABLE follow (
  follower VARCHAR NOT NULL,
  following VARCHAR NOT NULL,

  PRIMARY KEY (follower, following),
  FOREIGN KEY (follower) REFERENCES users(username)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (following) REFERENCES users(username)
  ON DELETE CASCADE ON UPDATE CASCADE
);