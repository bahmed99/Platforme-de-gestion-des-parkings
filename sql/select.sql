

-- ============================================================
--   Consultations                                     
-- ============================================================

-- Informations sur les parkings, les voitures, les places.
select * from parking;
select * from vehicule;
select * from place;

--Liste des parkings par commune

select * from parking where code_postal = 33400;


-- Liste des parkings qui sont saturés à un moment donnée
select num_parking 
from place p1
group by num_parking
having count(*)=
(select count(*) as places_libres 
 from place p2
where p1.num_parking=p2.num_parking id_place in 
(select id_place from occupation where date_heure_sortie is null and '2022-09-20 11:40:00' >=date_heure_entree)
group by num_parking); 


-- Liste des places disponibles, par parking, à un moment donnée
select id_place, numero_place from place 
where num_parking='4' and id_place not in 
(select id_place from place natural join occupation
 where date_heure_sortie is null and date_heure_entree <= '2022-09-20 11:40:00'::TIMESTAMP);

-- liste de voitures qui se sont garées dans deux parkings différents au cours d'une journée

select distinct(a.num_immatriculation)
from 	(select num_parking , num_immatriculation
		from occupation as o , place as p 
		where date_heure_entree::TIMESTAMP::DATE='01-09-2022' and o.id_place=p.id_place) 
		as a	,
		(select num_parking , num_immatriculation
		from occupation as o , place as p 
		where date_heure_entree::TIMESTAMP::DATE='01-09-2022' and o.id_place=p.id_place) as b
where a.num_immatriculation =b.num_immatriculation and a.num_parking<> b.num_parking;


-- ============================================================
--   Statistiques                                           
-- ============================================================

-- Moyenne du nombre de places disponibles par parking
select avg(places_libres) from (select count(*) as places_libres from place 
where id_place not in (select id_place from occupation where date_heure_sortie is null) 
group by num_parking) t;

-- La durée moyenne de stationnement d'un véhicule par parking

select avg(date_heure_sortie-date_heure_entree),o.num_immatriculation
from occupation o , place p 
where date_heure_sortie is not null and o.id_place = p.id_place and num_parking=1
group by num_immatriculation ; 

-- Le cout moyen du stationnement d'un véhicule par mois
select num_immatriculation ,avg(montant)
from occupation
where (SELECT EXTRACT(month FROM date_heure_entree))='10'
group by num_immatriculation;


-- Classement des parking les moins utilisés
select p.num_parking,count(*) 
from  place p , occupation o
where p.id_place= o.id_place 
group by p.num_parking
order by count(*) asc ;


-- Classement des parking les plus rentables par commune et par mois

select num_parking, sum(montant) from occupation o , place p 
where o.id_place = p.id_place and num_parking 
in (select num_parking from parking where code_postal = 33400) and 
(select EXTRACT(
    MONTH FROM date_heure_entree ))='10'
group by num_parking order by sum(montant) desc;


-- Classement des communes les plus demandés par semaine
select code_postal, count(*) from occupation o , place p ,parking pa  
where o.id_place = p.id_place and pa.num_parking = p.num_parking 
and (select EXTRACT( WEEK FROM date_heure_entree ))='39'
group by code_postal order by count(*) desc;