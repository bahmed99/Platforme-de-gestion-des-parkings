const fs = require('fs');

const sql_create = fs.readFileSync('./sql/create.sql').toString();
const database = require('../index');

module.exports = (req,res)=>{
    database.bd.query(sql_create).then(() => {
       res.json('created');
    }).catch((err) => {
        console.log(err);
    });
}