const express = require("express");
const router = express.Router();
const database = require("../index");
const requireLogin = require("../middleware/requireLogin");

//get all reservation (by admin)
router.get("/", (req, res) => {
    database.bd.query("SELECT * FROM personne", (error, results) => {
        if (error) {
        throw error;
        }
        res.send(results.rows);
    });
    }
);

//get user by middelware
router.get("/user",requireLogin, (req, res) => {
    database.bd.query("SELECT * FROM personne WHERE id_personne = $1", [req.user], (error, results) => {
        if (error) {
        throw error;
        }
        res.send(results.rows);
    });
    }
);

//update user
router.put("/",requireLogin, (req, res) => {
    console.log(req.body)
    const { nom_personne, prenom_personne, email_personne } = req.body;
    database.bd.query(
        "UPDATE personne SET nom_personne = $1, prenom_personne = $2, email_personne = $3 WHERE id_personne = $4",
        [nom_personne, prenom_personne, email_personne, req.user],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send({ message: "User updated successfully." });
        }
    );
    }
);


module.exports = router