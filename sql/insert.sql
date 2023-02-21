-- ============================================================
--    creation des donnees
-- ============================================================

-- Commune

insert into COMMUNE values (  33000 , 'Bordeaux') ;
insert into COMMUNE values (  33800 , 'Bordeaux') ;
insert into COMMUNE values (  33400 , 'Talence') ;
insert into COMMUNE values (  33600 , 'Pessac') ;
insert into COMMUNE values (  33700 , 'Merignac') ;
insert into COMMUNE values (  33140 , 'Villenave Ornan') ;
insert into COMMUNE values (  33100 , 'Bordeaux' ) ;
insert into COMMUNE values (  33200 , 'Bordeaux' ) ;
insert into COMMUNE values (  33300 , 'Bordeaux' ) ;


-- Personne

insert into PERSONNE values ( DEFAULT , 'Admin' , 'Admin' , 'admin@gmail.com' , '$2b$10$8PEBQa6ggoI.yvGIIuMSJelch.jGkAwwlG2eSt9lwO3PRFSmb.14i' , 'a' ) ;
insert into PERSONNE values ( DEFAULT , 'REKHIS' , 'Rafik' , 'rekhis@gmail.com' , 'rafik123' , 'c' ) ;
insert into PERSONNE values ( DEFAULT , 'CHEIKH' , 'Ilyes' , 'cheikh@gmail.com' , 'ilyes123' , 'c' ) ;
insert into PERSONNE values ( DEFAULT , 'GARGOURI' , 'Ines' , 'gargouri@gmail.com' , 'ines123' , 'c' ) ;
insert into PERSONNE values ( DEFAULT , 'User' , 'User' , 'user@gmail.com' , '$2b$10$8PEBQa6ggoI.yvGIIuMSJelch.jGkAwwlG2eSt9lwO3PRFSmb.14i' , 'c' ) ;


-- Vehicule

insert into VEHICULE values (  'AA-123-RR' , 'BMW' ,120000 , 'neuf' , '2021-11-11' , 2 ) ;
insert into VEHICULE values (  'AA-123-CI' , 'TESLA' ,50000 , 'neuf' , '2021-07-11' , 3 ) ;
insert into VEHICULE values (  'AA-123-GI' , 'AUDI' ,300000 , 'use' , '2021-09-01' , 4 ) ;
insert into VEHICULE values (  'AA-123-BA' , 'MAHINDRA' ,27000 , 'neuf' , '2020-10-15' , 5 ) ;


-- Parking

insert into PARKING values (  DEFAULT , 'T1' ,0.70 , '13 Av Prevost' , 10 , 33400 ) ;
insert into PARKING values (  DEFAULT , 'T2' ,0.80 , '28 Av Collegno' , 20 , 33400 ) ;
insert into PARKING values (  DEFAULT , 'P1' ,0.75 , '15 Rue Robert' , 150 , 33600 ) ;
insert into PARKING values (  DEFAULT , 'P2' ,0.65 , '50 Av Saige' , 90 , 33600 ) ;

-- Place

insert into PLACE values (  DEFAULT , 1 , 1 ) ;
insert into PLACE values (  DEFAULT , 2 , 1 ) ;
insert into PLACE values (  DEFAULT , 3 , 1 ) ;
insert into PLACE values (  DEFAULT , 4 , 1 ) ;
insert into PLACE values (  DEFAULT , 5 , 1 ) ;
insert into PLACE values (  DEFAULT , 6 , 1 ) ;
insert into PLACE values (  DEFAULT , 7 , 1 ) ;
insert into PLACE values (  DEFAULT , 8 , 1 ) ;
insert into PLACE values (  DEFAULT , 1 , 4 ) ;
insert into PLACE values (  DEFAULT , 2 , 4 ) ;
insert into PLACE values (  DEFAULT , 3 , 4 ) ;
insert into PLACE values (  DEFAULT , 4 , 4 ) ;
insert into PLACE values (  DEFAULT , 5 , 4 ) ;
insert into PLACE values (  DEFAULT , 6 , 4 ) ;
insert into PLACE values (  DEFAULT , 7 , 4 ) ;
insert into PLACE values (  DEFAULT , 8 , 4 ) ;
insert into PLACE values (  DEFAULT , 1 , 2 ) ;
insert into PLACE values (  DEFAULT , 2 , 2 ) ;
insert into PLACE values (  DEFAULT , 3 , 2 ) ;
insert into PLACE values (  DEFAULT , 4 , 2 ) ;
insert into PLACE values (  DEFAULT , 5 , 2 ) ;
insert into PLACE values (  DEFAULT , 6 , 2 ) ;
insert into PLACE values (  DEFAULT , 7 , 2 ) ;
insert into PLACE values (  DEFAULT , 8 , 2 ) ;
insert into PLACE values (  DEFAULT , 1 , 3 ) ;
insert into PLACE values (  DEFAULT , 2 , 3 ) ;
insert into PLACE values (  DEFAULT , 3 , 3 ) ;
insert into PLACE values (  DEFAULT , 4 , 3 ) ;
insert into PLACE values (  DEFAULT , 5 , 3 ) ;
insert into PLACE values (  DEFAULT , 6 , 3 ) ;
insert into PLACE values (  DEFAULT , 7 , 3 ) ;
insert into PLACE values (  DEFAULT , 8 , 3 ) ;

-- Reservation

insert into RESERVATION values (  '2022-09-01 8:00', 3, 1, 60, 0.7 ) ;
insert into RESERVATION values (  '2022-09-02 11:00', 5, 3, 60, 0.65 ) ;


-- Occupation

insert into OCCUPATION values ( '2022-09-05 10:30','AA-123-RR',6,'2022-09-05 12:30',1.4 ) ;
insert into OCCUPATION values ( '2022-10-01 08:30','AA-123-CI',7,'2022-10-01 12:30',2.8 ) ;
insert into OCCUPATION values ( '2022-09-01 20:00','AA-123-GI',9,'2022-09-01 23:00',1.95 ) ;
insert into OCCUPATION values ( '2022-09-20 11:30','AA-123-CI',6,NULL,NULL ) ;