const express = require("express");
const router = express.Router();
const database = require("../index");
const requireLogin = require("../middleware/requireLogin");
const { route } = require("./parking");
const moment = require("moment");


//get all reservation (by admin) 
router.get('/',(req,res) => {
    database.bd.query('SELECT * FROM reservation', (error,results) => {
        if (error) {
            throw error
        }

        res.send(results.rows)
    })
})


//do reservation
router.post('/newreservation', requireLogin, (req,res) => {

    database.bd.query('SELECT parking.tarif_horaire from parking join place on parking.num_parking = place.num_parking where place.id_place = $1 ',[req.body.id_place], (error,results) => {
        if (error) {
            throw error
        }
        let tarif = JSON.stringify(results.rows[0].tarif_horaire)
        const id_place = req.body.id_place
        const duree_reservation = req.body.duree_reservation
        const time = req.body.date_heure_entree
        const car_num=req.body.car
        const date_heure_sortie = req.body.date_heure_sortie
        console.log(req.body)
       
        database.bd.query("INSERT INTO OCCUPATION (date_heure_entree, NUM_IMMATRICULATION, id_place, date_heure_sortie,montant) VALUES ($1, $2, $3,$4, $5)",[time,car_num,id_place, date_heure_sortie,(duree_reservation/60)*tarif], (error,results) => {
            if (error) {
                throw error
            }
           
        })

        database.bd.query("INSERT INTO RESERVATION (date_heure_entree, id_personne, id_place, duree_reservation, montant) VALUES ($1, $2, $3, $4, $5) ",[time,req.user,id_place,duree_reservation, (duree_reservation/60)*tarif], (error,results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`reservation added by client: ${req.user}`)
        })
    })
})


//get all reservation by id_person 
router.get('/client', requireLogin , (req,res) => {
    database.bd.query('SELECT * FROM reservation r, place p,parking pa where r.id_place=p.id_place and pa.num_parking = p.num_parking and ID_PERSONNE = $1', [req.user], (error,results) => {
        if (error) {
            throw error
        }
        res.send(results.rows);
    })
})

//cancel reservation by id_person
router.delete('/myreservation', requireLogin , (req,res) => {
    const date_heure_entree = req.body.date_heure_entree
    database.bd.query('DELETE FROM reservation where ID_PERSONNE = $1 AND DATE_HEURE_ENTREE = $2 ', [req.user, date_heure_entree], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount > 0 ) {
            res.status(200).send(`reservation deleted with id_personne : ${req.user} and date_heure_entree : ${date_heure_entree} ${results.rows}`)
        }
        else {
            res.status(200).send('Reservation not found')
        }
    })
})

//Upcoming reservations from now
router.get('/upcomingreservation', (req,res) => {
    const date_heure_actuelle = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    database.bd.query('SELECT * from reservation where date_heure_entree > $1',[date_heure_actuelle], (error,results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0 ) {
            res.status(200).send(`No upcoming reservations from actual date : ${date_heure_actuelle} `)
        }
        else {
            res.send(results.rows)
        }
    })
})

module.exports = router