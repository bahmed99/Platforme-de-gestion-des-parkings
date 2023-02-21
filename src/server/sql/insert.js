const fs = require('fs');

const sql_insert = fs.readFileSync('./sql/insert.sql').toString();
const database = require('../index');

module.exports = (req,res)=>{
    database.bd.query(sql_insert).then(() => {
        res.json('inserted');
    }).catch((err) => {
        res.status(400).send(err);
    });
}