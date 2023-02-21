const express = require("express");
const router = express.Router();
const database = require("../index");

//Average number of spaces available per car park
router.get("/avgSpaceAvailablePerParking", (req, res) => {
    database.bd.query("select r1.num_parking, (SELECT CAST (r1.places_libres AS FLOAT))/r2.nbt as moy from (select num_parking,count(*) as places_libres from place where id_place not in (select id_place from occupation where( date_heure_sortie is null or (Select now()) < date_heure_sortie))group by num_parking) r1,(select count(*) as nbt ,num_parking from place group by num_parking) r2 where r1.num_parking = r2.num_parking ;", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

// avg duration of vehicule in parking
router.get("/avgDurationVehiculeByParking/:numparking", (req, res) => {
    const numparking = req.params.numparking;
    database.bd.query("select avg(date_heure_sortie-date_heure_entree), o.num_immatriculation from occupation o , place p  where date_heure_sortie is not null and o.id_place = p.id_place and num_parking= $1 group by num_immatriculation ", [numparking], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

//Ranking of the least used car parks
router.get("/leastUsedParking", (req, res) => {
    database.bd.query("select pa.NOM_PARKING,pa.num_parking, count(*) from occupation o , place p ,parking pa where o.id_place = p.id_place and pa.num_parking=p.num_parking group by pa.num_parking,pa.nom_parking order by count(*) asc", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

//Ranking of the most profitable car parks by municipality and by month
router.get("/mostProfitableParkingByMunicipalityAndByMonth/:municipality/:month", (req, res) => {
    const municipality = req.params.municipality;
    const month = req.params.month;
    database.bd.query("select pa.nom_parking, sum(montant) from occupation o,parking pa , place p  where o.id_place = p.id_place and pa.num_parking=p.num_parking and p.num_parking  in (select num_parking from parking where code_postal = $1) and montant is not null and  (select EXTRACT( MONTH FROM date_heure_entree ))=$2  group by pa.nom_parking order by sum(montant) desc", [municipality, month], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

//Ranking of the most requested municipalities per week
router.get("/mostRequestedMunicipalityPerWeek/:week", (req, res) => {
    const week = req.params.week;
    database.bd.query("select code_postal, count(*) from occupation o , place p ,parking pa  where o.id_place = p.id_place and pa.num_parking = p.num_parking and (select EXTRACT( WEEK FROM date_heure_entree ))=$1 group by code_postal order by count(*) desc", [week], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

//The average cost of parking a vehicle per month
router.get("/avgCostParkingVehiculePerMonth/:month", (req, res) => {
    const month = req.params.month;
    database.bd.query("select num_immatriculation ,avg(montant) from occupation where (SELECT EXTRACT(month FROM date_heure_entree))=$1 group by num_immatriculation;",[month] ,(error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });

});


module.exports = router;