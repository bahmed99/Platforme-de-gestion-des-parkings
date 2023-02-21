const express = require('express');
const router = express.Router();
const database = require('../index');


//get all occupations
router.get('/',(req,res) => {
        database.bd.query('SELECT * FROM occupation', (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        })

})

module.exports = router;