const express = require("express");
const router = express.Router();
const database = require("../index");
const requireLogin = require("../middleware/requireLogin");
const moment = require("moment");
//get places by numparking 
router.get('/numparking/:numparking', (req, res) => {
  const num_parking = req.params.numparking;
  database.bd.query('SELECT * FROM place where num_parking = $1', [num_parking], (error, results) => {
    if (error) {
      throw error
    }
    res.send(results.rows)
  })
})

//get reserved places by numparking
router.get('/reserved/numparking/:numparking', (req, res) => {
  const num_parking = req.params.numparking;
  database.bd.query('select * from reservation r, place p where r.id_place=p.id_place and p.num_parking=$1', [num_parking], (error, results) => {
    if (error) {
      throw error
    }
    res.send(results.rows)
  })
})




//get not disponible places by numparking on a specific date and time
router.get('/notdisponible/:numparking/:date/:duree', (req, res) => {
  const num_parking = req.params.numparking;
  const date = req.params.date;
  const duree = req.params.duree;
  database.bd.query("select * from occupation o , place p where (($1 between o.date_heure_entree and o.date_heure_sortie )  or ( o.date_heure_entree between $1 and ($1 + $2  * interval '1 minute'))) and p.num_parking=$3 and o.id_place=p.id_place ", [date, duree , num_parking], (error, results) => {
    if (error) {
      throw error
    }
    res.send(results.rows)
  })
})





//get occupied places by numparking
router.get('/occupied/numparking/:numparking', requireLogin,(req, res) => {
  const num_parking = req.params.numparking;
  console.log(num_parking);
  database.bd.query('select p.* from place p natural join occupation where num_parking = $1 and date_heure_sortie is null ', [num_parking], (error, results) => {
    if (error) {
      throw error
    }
    res.send(results.rows)
  })
})

//get free places by numparking 
router.get('/free/numparking/:numparking', (req, res) => {
  const num_parking = req.params.numparking;
  database.bd.query('select p.* from place p where num_parking = $1 except select p.* from place p natural join occupation where num_parking = $1 and (date_heure_sortie is null or (Select now()) between date_heure_entree and date_heure_sortie);', [num_parking], (error, results) => {
    if (error) {
      throw error
    }
    res.send(results.rows)
  })
})

//occupy a place
router.post('/occupy/:id_place', requireLogin ,(req, res) => {

  const id_place = req.params.id_place;
  
  const num_immatriculation = req.body.car

  const date_heure_entree = moment(req.body.date_heure_entree).format('YYYY-MM-DD HH:mm:ss');
        
  database.bd.query('INSERT INTO occupation (date_heure_entree,num_immatriculation,id_place) VALUES ($1,$2,$3) RETURNING *  ', [date_heure_entree,num_immatriculation,id_place], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`place occupied with num_immatriculation: ${results.rows[0].num_immatriculation} and id_place: ${results.rows[0].id_place} ` ) 
  })
})


//free a place
router.put('/free', requireLogin ,(req, res) => {
  let time = req.body.date_heure_entree/ 1000;
  let date_heure_entree = moment.unix(time).format('YYYY-MM-DD HH:mm:ss');
  const imm_voiture = req.body.imm_voiture;

  const date_heure_sortie = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  
        
  database.bd.query('update OCCUPATION set DATE_HEURE_SORTIE = $1 where DATE_HEURE_ENTREE = $2 and NUM_IMMATRICULATION = $3  RETURNING *', [date_heure_sortie,date_heure_entree,imm_voiture], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`place freed at date_heure_sortie: ${date_heure_sortie}` ) 
  })
})

module.exports = router;