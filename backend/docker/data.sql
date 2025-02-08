-- Create the database (run this separately before the rest of the script)
CREATE DATABASE "FootprintDB";

-- Connect to the database (this is done outside the script, e.g., via psql or your client)

-- -- Drop tables if they exist
-- DROP TABLE IF EXISTS "answermodel";
-- DROP TABLE IF EXISTS "result";
-- DROP TABLE IF EXISTS "transportmodel";
-- DROP TABLE IF EXISTS "userproperty";
--
-- -- Create UserProperty table
-- CREATE TABLE "userproperty" (
--                                 "User_id" SERIAL PRIMARY KEY,
--                                 "Username" VARCHAR(255) NOT NULL,
--                                 "Password" VARCHAR(255) NOT NULL,
--                                 "Email" VARCHAR(255) NOT NULL,
--                                 "Firstname" VARCHAR(255) NOT NULL,
--                                 "Lastname" VARCHAR(255) NOT NULL
-- );
--
-- -- Create Transportmodel table
-- CREATE TABLE "transportmodel" (
--                                   "T_id" SERIAL PRIMARY KEY,
--                                   "Transportname" VARCHAR(255) NOT NULL,
--                                   "Fuel_factor" INTEGER NOT NULL,
--                                   "Emission_factor" INTEGER NOT NULL
-- );
--
-- -- Create Result table
-- CREATE TABLE "result" (
--                           "Id" SERIAL PRIMARY KEY,
--                           "co_per_day" DECIMAL(10,2) NOT NULL,
--                           "co_per_month" DECIMAL(10,2) NOT NULL,
--                           "co_per_year" DECIMAL(10,2) NOT NULL
-- );
--
-- -- Create Answermodel table
-- CREATE TABLE "answermodel" (
--                                "Answer_id" SERIAL PRIMARY KEY,
--                                "date" DATE NOT NULL,
--                                "time" TIME NOT NULL,
--                                "transportmethod" INTEGER REFERENCES "Transportmodel"("T_id"),
--                                "distance" INTEGER NOT NULL,
--                                "passenger_count" INTEGER NOT NULL,
--                                "user" INTEGER REFERENCES "UserProperty"("User_id")
-- );

-- Insert Data For UserProperty
INSERT INTO "userproperty" ("username", "password", "email", "firstname", "lastname","admin") VALUES
                                                                                                  ('Reza', '123456', 'reza@reza.com', 'reza', 'abaspoor',true),
                                                                                                  ('sflanaghan1', 'pW6#H7,(_<AfsJ', 'sflanaghan1@zimbio.com', 'Stoddard', 'Flanaghan',false),
                                                                                                  ('ktinson2', 'dU3*b54sS!Ce', 'ktinson2@tamu.edu', 'Krystalle', 'Tinson',false),
                                                                                                  ('pridge3', 'xV4)JKhAJo*aN', 'pridge3@mediafire.com', 'Phylis', 'Ridge',true),
                                                                                                  ('gemeline4', 'zN1>Pdy(Fa+H', 'gemeline4@samsung.com', 'Glyn', 'Emeline',false),
                                                                                                  ('mcurdell5', 'pI8|Hho3!COv~/', 'mcurdell5@theglobeandmail.com', 'Morissa', 'Curdell',false),
                                                                                                  ('rlabatie6', 'oN2/8F~c', 'rlabatie6@bloglovin.com', 'Roxine', 'La Batie',false),
                                                                                                  ('jquant7', 'mH2''TtA>I"c', 'jquant7@washington.edu', 'Jase', 'Quant',false),
                                                                                                  ('pgrisenthwaite8', 'zR9/tsN.9HW(Q}e', 'pgrisenthwaite8@usatoday.com', 'Pietrek', 'Grisenthwaite',false),
                                                                                                  ('rwason9', 'sJ0(?+EA9(l5', 'rwason9@who.int', 'Regine', 'Wason',true);
-- Insert Data For Transportmodel
INSERT INTO "transportmodel" ("transportname", "fuel_factor", "emission_factor") VALUES
                                                                                     ('Car', 1, 1),
                                                                                     ('Plane', 2, 2),
                                                                                     ('Train', 3, 3),
                                                                                     ('Ship', 4, 4);

-- Insert Data For Result
INSERT INTO "result" ("co_per_day", "co_per_month", "co_per_year") VALUES
                                                                       (5.84, 30.32, 219.41),
                                                                       (2.87, 20.3, 595.77),
                                                                       (2.41, 3.15, 616.09),
                                                                       (3.87, 54.8, 35.4),
                                                                       (5.46, 33.68, 263.11),
                                                                       (7.37, 63.06, 368.94),
                                                                       (4.77, 33.2, 925.38),
                                                                       (3.19, 8.28, 572.77),
                                                                       (5.08, 38.19, 980.48),
                                                                       (3.67, 37.72, 930.15),
                                                                       (1.17, 89.85, 575.29),
                                                                       (3.08, 58.44, 513.09),
                                                                       (4.66, 70.44, 856.01),
                                                                       (6.15, 31.71, 139.49),
                                                                       (2.03, 64.5, 742.84),
                                                                       (6.3, 51.92, 654.81),
                                                                       (3.43, 81.84, 780.66),
                                                                       (7.27, 72.34, 475.16),
                                                                       (2.12, 2.22, 212.15),
                                                                       (6.61, 39.77, 863.08);

-- Insert Data For Answermodel
INSERT INTO "answermodel" ("date", "time","distance", "passenger_count","answerbytransportid","answerbyuserid") VALUES
                                                                                                                    ('2024-05-15', '06:07:00',5058, 12, 1,2),
                                                                                                                    ('2025-01-09', '19:01:00',8163, 1, 2,3),
                                                                                                                    ('2024-06-26', '16:27:00',486, 13, 2,4),
                                                                                                                    ('2024-07-31', '01:13:00',7484, 10, 3,5),
                                                                                                                    ('2024-05-25', '07:34:00',663, 14, 1,7),
                                                                                                                    ('2024-10-04', '04:12:00',1925, 15, 4,6),
                                                                                                                    ('2025-01-13', '02:44:00',8563, 7,1,5),
                                                                                                                    ('2024-12-20', '00:02:00',4426, 8,2,8),
                                                                                                                    ('2025-01-13', '14:38:00',6117, 19,3,4),
                                                                                                                    ('2024-04-05', '03:51:00',8246, 17,2,2),
                                                                                                                    ('2024-06-25', '13:15:00',1348, 9,3,1),
                                                                                                                    ('2024-07-26', '20:12:00',1844, 1,2,5),
                                                                                                                    ('2024-02-19', '03:31:00',3000, 3,4,6),
                                                                                                                    ('2024-08-07', '23:53:00',932, 10,3,6),
                                                                                                                    ('2024-11-04', '14:47:00',2714, 11,4,5),
                                                                                                                    ('2024-04-20', '02:54:00',1577, 13,2,8),
                                                                                                                    ('2024-12-04', '20:53:00',2183, 17,1,9),
                                                                                                                    ('2024-09-13', '21:41:00',6601, 7,1,6),
                                                                                                                    ('2024-06-07', '04:45:00',4484, 10,3,5),
                                                                                                                    ('2024-06-10', '14:20:00',1701, 12,3,6);