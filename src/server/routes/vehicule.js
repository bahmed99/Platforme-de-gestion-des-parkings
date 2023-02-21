const express = require("express");
const router = express.Router();
const database = require("../index");
const requireLogin = require("../middleware/requireLogin");

//add vehicule 
router.post('/', requireLogin, (req, res) => {
    const id_personne = req.user
  const { num_immatriculation, marque, kilometrage , etat , date_mise_circulation} = req.body
  database.bd.query('INSERT INTO vehicule (num_immatriculation, marque, kilometrage, etat,date_mise_circulation ,id_personne) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [num_immatriculation,marque,kilometrage,etat,date_mise_circulation,id_personne], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`vehicule added with num_immatriculation: ${results.rows[0].num_immatriculation}`)
  })
})

//get vehicules parked in 2 parkings on 1 day
router.get('/vehiculeParkedInTwoParkingOnOneDay/:date',  (req, res) => {
  const date = req.params.date
  database.bd.query('select distinct(a.num_immatriculation) from 	(select num_parking , num_immatriculation from occupation o , place  p where date_heure_entree::TIMESTAMP::DATE=$1 and o.id_place=p.id_place)  a	,(select num_parking , num_immatriculation from occupation  o , place  p where date_heure_entree::TIMESTAMP::DATE=$1 and o.id_place=p.id_place)  b where a.num_immatriculation =b.num_immatriculation and a.num_parking<> b.num_parking',[date], (error, results) => {
    if (error) {
        throw error
    }
    res.send(results.rows)
})
})

//get vehicules par persone
router.get('/',requireLogin,  (req, res) => {
  const id_personne = req.user
  database.bd.query('select * from vehicule where id_personne=$1',[id_personne], (error, results) => {
    if (error) {
        throw error
    }
    res.send(results.rows)
})
})


//modifier vehicule
router.put('/',requireLogin, (req, res) => {
  const { num_immatriculation, kilometrage , etat , } = req.body
  database.bd.query('UPDATE vehicule SET kilometrage=$2, etat=$3 WHERE num_immatriculation=$1 ',[num_immatriculation,kilometrage,etat], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send({ message: "vehicule updated successfully." });
  })
})

//get all vehicule
router.get('/all', (req, res) => {
  database.bd.query('select * from vehicule', (error, results) => {
    if (error) {
      throw error
    }
    res.send(results.rows)
  })
})
 module.exports = router;