const fs = require('fs');

const sql_drop = fs.readFileSync('./sql/drop.sql').toString();
const database = require('../index');

module.exports = (req,res)=>{
    database.bd.query(sql_drop).then(() => {
       res.json('dropped');
    }).catch((err) => {
        console.log(err);
    });
}