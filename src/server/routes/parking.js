const express = require('express');
const router = express.Router();
const database = require('../index');


//get all parkings 
router.get('/',(req,res) => {
        database.bd.query('SELECT * FROM parking', (error, results) => {
          if (error) {
            throw error
          }
          res.send(results.rows)
        })
        
      
})


//get parking by id
router.get('/:id',(req,res) => {
        
            
            database.bd.query('SELECT * FROM parking WHERE num_parking = $1',[req.params.id], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
            })
            
})

//get parking by code postal
router.get('/codepostal/:codepostal',(req,res) => {
    database.bd.query('SELECT * FROM parking WHERE code_postal = $1',[req.params.codepostal], (error, results) => {
        if (error) {
            throw error
        }
        res.send(results.rows)
    })



})


//add parking
router.post('/',(req,res)=>{
    const { nom_parking, tarif_horaire, adresse_parking, capacite_parking, code_postal } = req.body

    database.bd.query('INSERT INTO PARKING (nom_parking, tarif_horaire, adresse_parking, capacite_parking, code_postal) VALUES ($1, $2, $3, $4, $5) RETURNING * ', [nom_parking, tarif_horaire, adresse_parking, capacite_parking, code_postal], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`parking added with num_parking: ${results.rows[0].num_parking}`)
    })
})


//delete parking
router.delete('/:numparking',(req,res)=>{
    const num_parking = req.params.numparking

    database.bd.query('DELETE FROM PARKING WHERE num_parking = $1',[num_parking], (error, results) => {
        if (error) {
          throw error
        }
        if(results.rowCount > 0){
        res.status(200).send(`parking deleted with num_parking: ${num_parking}`)
        }
        else{
            res.status(200).send(`parking not found`)
        }
      })
})

//get satured parkings on a specific date
router.get('/occuped/:date',(req,res) => {
   
})


module.exports = router;