INSERT INTO Employee (FIRST_NAME, LAST_NAME, ROLE) VALUES
  ('Lokesh', 'Gupta', 'abc@gmail.com'),
  ('Deja', 'Vu', 'xyz@email.com'),
  ('Caption', 'America', 'cap@marvel.com');

INSERT INTO Orders (description, status) VALUES
    ('MacBook PRO', 0),
    ('Some Other Thing', 1);

INSERT INTO APP_USER (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, APP_USER_ROLE, ENABLED, LOCKED) VALUES
    ('Pablo' , 'Black', 'pablo@black.com', '$2y$10$eZFNwAAaSPgxw.rpdD8czOA82gjNMiSZR.vvEjARxV3Odih6Hs6Iu', 'COACH',  TRUE, FALSE), --haslo: pabloblack
    ('Pablo' , 'White', 'pablo@white.com', '$2y$10$ixeNK99lV8FoTSttqeOYyOCRVmPw9bA9Qkqgyfp/2/9ekYS2FTQX6', 'ADMIN',  TRUE, FALSE); --haslo: pablowhite