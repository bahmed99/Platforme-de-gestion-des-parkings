-- ============================================================
--   Table : PERSONNE                                            
-- ============================================================
create table if not exists PERSONNE
(
    ID_PERSONNE SERIAL,
    NOM_PERSONNE VARCHAR(25),
    PRENOM_PERSONNE VARCHAR(25),
    EMAIL_PERSONNE VARCHAR(75),
    PASSWORD_PERSONNE VARCHAR,
    ROLE VARCHAR(20) check (ROLE in ('a', 'c')),
    constraint pk_personne primary key (ID_PERSONNE)
);


-- ============================================================
--   Table : VEHICULE                                            
-- ============================================================
create table if not exists VEHICULE
(
    NUM_IMMATRICULATION CHAR(9) not null,
    MARQUE VARCHAR(25),
    KILOMETRAGE INTEGER,
    ETAT VARCHAR(20),
    DATE_MISE_CIRCULATION DATE,
    ID_PERSONNE integer, 
    constraint pk_vehicule primary key (NUM_IMMATRICULATION),
    constraint fk_vehicule_personne foreign key (ID_PERSONNE)
    references PERSONNE (ID_PERSONNE)
);


-- ============================================================
--   Table : COMMUNE                                            
-- ============================================================
create table if not exists COMMUNE
(
    CODE_POSTAL INTEGER not null,
    NOM_COMMUNE VARCHAR(50),
    constraint pk_commune primary key (CODE_POSTAL)
);


-- ============================================================
--   Table : PARKING                                            
-- ============================================================
create table if not exists PARKING
(
    NUM_PARKING SERIAL,
    NOM_PARKING VARCHAR(50),
    TARIF_HORAIRE REAL,
    ADRESSE_PARKING VARCHAR(100),
    CAPACITE_PARKING SMALLINT,
    CODE_POSTAL INTEGER not null,
    constraint pk_parking primary key (NUM_PARKING),
    constraint fk_parking_commune foreign key (CODE_POSTAL)
       references COMMUNE (CODE_POSTAL)
);


-- ============================================================
--   Table : PLACE                                            
-- ============================================================
create table if not exists PLACE
(
    ID_PLACE SERIAL,
    NUMERO_PLACE INTEGER,
	NUM_PARKING INTEGER not null,
    constraint pk_place primary key (ID_PLACE),
    constraint fk_place_parking foreign key (NUM_PARKING)
       references PARKING (NUM_PARKING)
);


-- ============================================================
--   Table : OCCUPATION                                            
-- ============================================================
create table if not exists OCCUPATION
(
    DATE_HEURE_ENTREE TIMESTAMP not null,
    NUM_IMMATRICULATION CHAR(9) not null, 
    ID_PLACE INTEGER not null,
    DATE_HEURE_SORTIE TIMESTAMP,
    MONTANT REAL check (MONTANT >= 0),
    constraint pk_occupation primary key (DATE_HEURE_ENTREE, NUM_IMMATRICULATION),
    constraint fk_occupation_voiture foreign key (NUM_IMMATRICULATION)
       references VEHICULE (NUM_IMMATRICULATION),
    constraint fk_occupation_place foreign key (ID_PLACE)
       references PLACE (ID_PLACE)
);


-- ============================================================
--   Table : RESERVATION                                            
-- ============================================================
create table if not exists RESERVATION
(
    DATE_HEURE_ENTREE TIMESTAMP not null,
    ID_PERSONNE INTEGER not null, 
    ID_PLACE INTEGER not null,
    DUREE_RESERVATION INTEGER,
    MONTANT REAL,
    constraint pk_reservation primary key (DATE_HEURE_ENTREE, ID_PERSONNE),
    constraint fk_reservation_personne foreign key (ID_PERSONNE)
       references PERSONNE (ID_PERSONNE),
    constraint fk_reservation_place foreign key (ID_PLACE)
       references PLACE (ID_PLACE)
);

-- ============================================================
--    TRIGGERS                                           
-- ============================================================


-- Trigger pour l'annulation d'une réservation et la mise à jour des occupations

CREATE OR REPLACE FUNCTION annul_reserv()
  RETURNS trigger AS
  $$

BEGIN
    delete from Occupation where DATE_HEURE_ENTREE = OLD.DATE_HEURE_ENTREE and ID_PLACE = OLD.ID_PLACE; 
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

create or replace trigger annul_reserv 
after delete on RESERVATION
FOR EACH ROW
EXECUTE PROCEDURE annul_reserv();



-- Trigger pour le calcul du montant après l'ajout du date_heure_sortie

CREATE OR REPLACE FUNCTION calcul_montant_occup()
  RETURNS trigger AS
  
$psql$
BEGIN
declare 
tarif_h real;
duree real ;
numP PLACE.NUM_PARKING%type;
BEGIN
IF NEW.montant is null THEN
select NUM_PARKING into numP from place where ID_PLACE = NEW.ID_PLACE ;
SELECT TARIF_HORAIRE into tarif_h from PARKING where NUM_PARKING = numP;
duree := CEIL(EXTRACT(EPOCH FROM (NEW.DATE_HEURE_SORTIE - NEW.DATE_HEURE_ENTREE))/3600);
update OCCUPATION set MONTANT = tarif_h*duree where DATE_HEURE_ENTREE = OLD.DATE_HEURE_ENTREE 
and NUM_IMMATRICULATION = OLD.NUM_IMMATRICULATION;
END IF;
RETURN  new;
END;
END;
$psql$
LANGUAGE 'plpgsql';

create or replace trigger calcul_montant_occup 
after update on OCCUPATION
FOR EACH ROW
EXECUTE PROCEDURE calcul_montant_occup();



