const express = require('express');
const router = express.Router();
const database = require('../index');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//sign in
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    database.bd.query('SELECT * FROM PERSONNE WHERE email_personne = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length == 0) {
            res.status(400).send({ message: "Email doesn't exist" })
        }
        else {
            bcrypt
                .compare(password, results.rows[0].password_personne)
                .then((domatch) => {
                    if (domatch) {
                        const token = jwt.sign({ id: results.rows[0].id_personne }, process.env.JWT_SECRET);
                        res.send({ token: token, role: results.rows[0].role });
                    }
                    else {
                        res.status(400).send({ message: "Wrong password" })
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    )
})

//sign up
router.post('/signup', (req, res) => {
    const { nom, prenom, email, password } = req.body;
    database.bd.query('SELECT * FROM PERSONNE WHERE email_personne = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length > 0) {
            res.status(401).send({ message: "Email already exist" })
        } else {
            bcrypt.hash(password, 10).then((hash) => {
                database.bd.query('INSERT INTO PERSONNE (nom_personne,prenom_personne,email_personne,password_personne,role) VALUES ($1,$2,$3,$4,$5)', [nom, prenom, email, hash, "c"], (error, results) => {
                    if (error) {
                        throw error
                    }
                    res.status(200).send({ message: "User created" })
                })
            })
        }


    })
})

module.exports = router