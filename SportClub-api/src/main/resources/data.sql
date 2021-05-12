INSERT INTO Employee (FIRST_NAME, LAST_NAME, ROLE) VALUES
  ('Lokesh', 'Gupta', 'abc@gmail.com'),
  ('Deja', 'Vu', 'xyz@email.com'),
  ('Caption', 'America', 'cap@marvel.com');

INSERT INTO Orders (description, status) VALUES
    ('MacBook PRO', 0),
    ('Some Other Thing', 1);

INSERT INTO APP_USER (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, APP_USER_ROLE, ENABLED, LOCKED) VALUES
    ('Pablo' , 'Black', 'pablo@black.com', '$2y$10$eZFNwAAaSPgxw.rpdD8czOA82gjNMiSZR.vvEjARxV3Odih6Hs6Iu', 'COACH',  TRUE, FALSE), --haslo: pabloblack
    ('Pablo' , 'White', 'pablo@white.com', '$2y$10$ixeNK99lV8FoTSttqeOYyOCRVmPw9bA9Qkqgyfp/2/9ekYS2FTQX6', 'ADMIN',  TRUE, FALSE), --haslo: pablowhite
    ('Pablo' , 'Brown', 'pablo@brown.com', '$2y$10$7z/WK4R0C.d5a1npDhpuJuhKWi6yNl3Z2Z8ZxRix6RByI.GeSSxQm', 'COACH',  TRUE, FALSE), --haslo: pablobrown
    ('Pablo' , 'Magenta', 'pablo@magenta.com', '$2y$10$UUvItzMEVcLVVTc.viabDu0NFpV5BuPVqqDuluqQc2gIL/R/JLlpW', 'PLAYER',  TRUE, FALSE), --haslo: pablomagenta
    ('Pablo' , 'Xanadu', 'pablo@xanadu.com', '$2y$10$UqerPiuzZW6CywBNxn/bpuRrm1W2mBcpTnTXu/0kA9IyhFbMPbAa.', 'PLAYER',  TRUE, FALSE), --haslo: pabloxanadu
    ('Pablo' , 'Aquamarine', 'pablo@aquamarine.com', '$2y$10$H9CxFw2O6VKWj6j0SJQ0juUP0OFQx6rfFnPC.5sKlDuDGJrylX/6i', 'PLAYER',  TRUE, FALSE); --haslo: pabloaquamarine

INSERT INTO CONTRACT (END_DATE, MONEY, START_DATE, USER_ID) VALUES
    ('2022-02-15' , '2000', '2020-04-04', '4');



INSERT INTO Announcement (DATE,TEXT,USER_ID) VALUES
    ('2020-04-04 12:00:00','11.05.2021 Na Sohan odbedzie sie event gorniczy',2);