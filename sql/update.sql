UPDATE personne 
SET nom_personne = "$1", prenom_personne = "$2", email_personne = "$3"
WHERE id_personne = "$4" ;

update OCCUPATION set DATE_HEURE_SORTIE = "$1" 
where DATE_HEURE_ENTREE = "$2" and NUM_IMMATRICULATION = "$3";

UPDATE vehicule 
SET kilometrage="$2", etat="$3"
WHERE num_immatriculation="$1" ;  