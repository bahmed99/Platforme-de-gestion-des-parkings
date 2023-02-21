const express = require('express');
const router = express.Router();
const database = require('../index');

//verify if the code postal is already in the database
router.get('/:code_postal', async (req, res) => {
    try {
        const { code_postal } = req.params;
        const { rows } = await database.bd.query('SELECT * FROM commune WHERE code_postal = $1', [code_postal]);
        if (rows.length === 0) {
            res.status(200).json({ message: false });
        } else {
            res.status(200).json({ message: true });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all the communes
router.get('/', async (req, res) => {
    try {
        const { rows } = await database.bd.query('SELECT * FROM commune');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;